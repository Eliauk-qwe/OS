%include "boot.inc"
section loader vstart=LOADER_BASE_ADDR
                                                        ;==========================
                                                        ;设置GDT（全局描述符表）
                                                        ;==========================

GDT_BASE:
    dd 0x000000000
    dd 0x000000000

CODE_DESP:
    dd 0x0000FFFF
    dd DESC_CODE_HIGH4

DATA_STACK_DESC:
    dd 0x0000FFFF
    dd DESC_DATA_HIGH4

VIDEO_DESC:
    dd 0x80000007                                          ;limit=(0xbffff-0xb8000)/4k=0x7
    dd DESC_VIDEO_HIGH4


    GDT_SIZE epu $-GDT_BASE                                 ;gdt_ptr中需要的变量
    GDT_LIMIT  epu GDT_SIZE-1

    time 60 dp 0                                            ;初始化60个描述符

    SELECTOR_CODE epu (0x0001<<3)+TI_GDT+RPL0               ;初始化段选择子
    SELECTOR_DATA epu (0x0002<<3)+TI_GDT+RPL0
    SELECTOR_VIDEO epu (0x003<<3)+TI_GDT+RPL0

total_mem_bytes dd 0

gdt_ptr dw GDT_LIMIT
        dd GDT_BASE

ards_buf times 244 db 0                                      ;ARDS 是 地址范围描述符结构
ards_nr dw 0                                                 ;ARDS 的数量



                                                        ;===============================================
                                                        ;检测内存 BIOS中断 int 15h  E820h     获得总内存大小
                                                        ;===============================================

loader_start:
    xor ebx,ebx                                          ;第一次调用时，ebx值要为0
    mov edx,0x534d4150                                   ;设置为魔术字 `'SMAP'`。这个签名是为了确保 BIOS 支持这个功能。
    mov di,ards_buf
.e820_mem_get_loop:
    mov eax,0x534d4150                                   ;执行int 0x15后,eax值变为0x534d4150,所以每次执行int前都要更新为子功能号。
    mov ecx,20
    int 0x15                                             ;ARDS地址范围描述符结构大小是20字节
    add di,ecx
    inc word [ards_nr]                                   ;dw <-> word 操作一个字
    cmp ebx,0
    jnz .e820_mem_get_loop

    mov cx,[ards_buf]
    mov ebx,ards_buf
    xor edx,edx
.find_max_mem_area:
    mov eax,[ebx]
    add eax,[ebx+8]                                      ;eax为每一块内存的结束物理地址
    add ebx,20
    cmp edx,eax
    jge .next_ards
    mov edx,eax
.next_ards:
    loop .find_max_mem_area

    mov [total_mem_bytes],edx


                                                        ;====================
                                                        ;准备进入保护模式
                                                        ;1 打开A20
                                                        ;2 加载gdt
                                                        ;3 将cr0的pe位置1
                                                        ;4 远跳转清空流水线（清空cpu的预测），cs=SELECTOR_CODE
                                                        ;====================
    in  al,0x92
    or  al,0000_0010B
    out 0x92,al


    lgdt [gdt_ptr]

    mov eax,cr0
    or  eax,0x00000001
    mov cr0,eax


                                                        ;jmp dword SELECTOR_CODE:p_mode_start	    
    jmp SELECTOR_CODE:p_mode_start	                    ; 刷新流水线，避免分支预测的影响,这种cpu优化策略，最怕jmp跳转，
					                                    ; 这将导致之前做的预测失效，从而起到了刷新的作用。
                                                            ;1 刷新 CS 缓存器： 远跳转操作会强制 CPU 加载新的段选择子 SELECTOR_CODE。
                                                            ;2 加载新的段描述符： CPU 会拿着 SELECTOR_CODE 这个索引去 GDT 中查找对应的代码段描述符，然后将描述符中的基地址、界限、属性等正确的保护模式信息加载到 CS 的缓存器中。
                                                            ;3 更新 EIP： 将 p_mode_start 的地址加载到指令指针寄存器 EIP 中。

.error_hlt:
    hlt


[bits 32]
                                                        ;==================================
                                                        ;保护模式开始     初始化保护模式
                                                        ;==================================
    mov ax,SELECTOR_DATA
    mov ds,ax
    mov es,ax
    mov ss,ax
    mov esp,LOADER_STACK_TOP
    mov ax,SELECTOR_VIDEO
    mov gs,ax

                                                        ;===============================
                                                        ;加载内存：从磁盘中读取到内存
                                                        ;===============================
    mov eax,KERNEL_START_SECTOR
    mov ebx,KERNEL_BIN_BASE_ADDR
    mov ecx,20
    call rd_disk_m_32

                                                        ;===============
                                                        ;设置页表
                                                        ;===============
    call setup_page  

    mov  ebx,[gdt_ptr +2]
    or   dword [ebx+0x18+4],0xc0000000

    add  dword [gdt_ptr +2],0xc0000000

    add esp,0xc0000000






setup_page:

    mov ecx,4096
    mov esi,0

.clear_page_dir
    mov byte [PAGE_DIR_TABLE_POS]




                                                        ;-------------------------------------------------------------------------------
                                                        ;功能:读取硬盘n个扇区
rd_disk_m_32:	   
                                                        ;-------------------------------------------------------------------------------
				                                        ; eax=LBA扇区号
				                                        ; ebx=将数据写入的内存地址
				                                        ; ecx=读入的扇区数
    mov esi,eax	                                        ;备份eax
    mov di,cx		                                    ;备份cx
                                                        ;读写硬盘:
                                                        ;第1步：选择特定通道的寄存器，设置要读取的扇区数
    mov dx,0x1f2
    mov al,cl
    out dx,al                                           ;读取的扇区数

    mov eax,esi	                                        ;恢复ax

                                                        ;第2步：在特定通道寄存器中放入要读取扇区的地址，将LBA地址存入0x1f3 ~ 0x1f6
                                                        ;LBA地址7~0位写入端口0x1f3
    mov dx,0x1f3                       
    out dx,al                          

                                                        ;LBA地址15~8位写入端口0x1f4
    mov cl,8
    shr eax,cl
    mov dx,0x1f4
    out dx,al

                                                        ;LBA地址23~16位写入端口0x1f5
    shr eax,cl
    mov dx,0x1f5
    out dx,al

    shr eax,cl
    and al,0x0f	                                        ;lba第24~27位
    or al,0xe0	                                        ; 设置7～4位为1110,表示lba模式
    mov dx,0x1f6
    out dx,al

                                                        ;第3步：向0x1f7端口写入读命令，0x20 
    mov dx,0x1f7
    mov al,0x20                        
    out dx,al

                                                        ;第4步：检测硬盘状态
.not_ready:
                                                        ;同一端口，写时表示写入命令字，读时表示读入硬盘状态
    nop
    in al,dx
    and al,0x88	                                        ;第4位为1表示硬盘控制器已准备好数据传输，第7位为1表示硬盘忙
    cmp al,0x08
    jnz .not_ready	                                    ;若未准备好，继续等。

                                                        ;第5步：从0x1f0端口读数据
    mov ax, di                                          ;di当中存储的是要读取的扇区数
    mov dx, 256                                         ;每个扇区512字节，一次读取两个字节，所以一个扇区就要读取256次，与扇区数相乘，就等得到总读取次数
    mul dx                                              ;8位乘法与16位乘法知识查看书p133,注意：16位乘法会改变dx的值！！！！
    mov cx, ax	                                        ; 得到了要读取的总次数，然后将这个数字放入cx中
    mov dx, 0x1f0
.go_on_read:
    in ax,dx
    mov [ebx],ax                                        ;与rd_disk_m_16相比，就是把这两句的bx改成了ebx
    add ebx,2		        
                                                        ; 由于在实模式下偏移地址为16位,所以用bx只会访问到0~FFFFh的偏移。
                                                        ; loader的栈指针为0x900,bx为指向的数据输出缓冲区,且为16位，
                                                        ; 超过0xffff后,bx部分会从0开始,所以当要读取的扇区数过大,待写入的地址超过bx的范围时，
                                                        ; 从硬盘上读出的数据会把0x0000~0xffff的覆盖，
                                                        ; 造成栈被破坏,所以ret返回时,返回地址被破坏了,已经不是之前正确的地址,
                                                        ; 故程序出会错,不知道会跑到哪里去。
                                                        ; 所以改为ebx代替bx指向缓冲区,这样生成的机器码前面会有0x66和0x67来反转。
                                                        ; 0X66用于反转默认的操作数大小! 0X67用于反转默认的寻址方式.
                                                        ; cpu处于16位模式时,会理所当然的认为操作数和寻址都是16位,处于32位模式时,
                                                        ; 也会认为要执行的指令是32位.
                                                        ; 当我们在其中任意模式下用了另外模式的寻址方式或操作数大小(姑且认为16位模式用16位字节操作数，
                                                        ; 32位模式下用32字节的操作数)时,编译器会在指令前帮我们加上0x66或0x67，
                                                        ; 临时改变当前cpu模式到另外的模式下.
                                                        ; 假设当前运行在16位模式,遇到0X66时,操作数大小变为32位.
                                                        ; 假设当前运行在32位模式,遇到0X66时,操作数大小变为16位.
                                                        ; 假设当前运行在16位模式,遇到0X67时,寻址方式变为32位寻址
                                                        ; 假设当前运行在32位模式,遇到0X67时,寻址方式变为16位寻址.
    loop .go_on_read
    ret




    

