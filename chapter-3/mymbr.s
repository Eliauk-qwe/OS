%include "boot.inc"
SECTION MBR vstart=0x7c00
    mov ax,cs
    mov ds,ax
    mov es,ax
    mov ss,ax
    mov fs,ax
    mov sp,0x7c00
    mov ax,0xb800               ;利用显存
    mov gs,ax


                                ;清屏，利用向量中断表，显示服务（int 10和）的06h,07h功能号
    mov ax,0x0600
    mov bx,0x0700               ;bx=0111 0000  黑底白字
    mov cx,0
    mov dx,0x184f
    int 10h


                                ;设置显存，来控制显示
    mov byte  [gs:0x0000],'1'
    mov byte  [gs:0x0001],0xA4  ;0xA4=1010 0100  绿色闪烁背景  红色字体

    mov byte  [gs:0x0002],' '
    mov byte  [gs:0x0003],0xA4

    mov byte  [gs:0x0004],'M'
    mov byte  [gs:0x0005],0xA4

    mov byte  [gs:0x0006],'B'
    mov byte  [gs:0x0007],0xA4

    mov byte  [gs:0x0008],'R'
    mov byte  [gs:0x0009],0xA4


                                ;设置读取磁盘是什么
    mov eax,LOADER_START_SECTOR
    mov bx,LOADER_BASE_ADDR
    mov cx,1
    call rd_disk_m_16           ;正式读取磁盘内容到1MB内存的函数

    jmp LOADER_BASE_ADDR

rd_disk_m_16:
                                ;备份cx
    mov   esi,eax
    mov   di,cx


                                ;读写硬盘，action！
    mov   dx,0x1f2
    mov   al,cl
    out   dx,al

    mov   eax,esi

    mov   dx,0x1f3
    out   dx,al

    mov   dx,0x1f4
    mov   cl,8
    shr   eax,cl
    out   dx,al


    mov   dx,0x1f5
    shr   eax,cl
    out   dx,al

    mov   dx,0x1f6
    shr   eax,cl
    and   al,0x0f                ;取后4位，与操作     0000 1111
    or    al,0xe0                ;设置7～4位为1110，表示LBA模式
    mov   dx,al

                                 ;第3步：向0x1f7端口写入读命令，0x20
    mov   dx,0x1f7
    mov   al,0x20                ;eax完了
    out   dx,al


                                    ;第4步：检测硬盘状态
.not_ready:
    nop
    in al,dx
    and  al,0x88                    ;1000 1000
    cmp  al,ox08
    jnz  .not_ready


                                    ;第5步：从0x1f0端口读数据
    mov ax,di
    mov dx,256
    mul dx
    mov cx,ax
    mov dx,0x1f0

.go_on_read:
    in  ax,dx
    mov [bx],ax
    add bx,2
    loop .go_on_read
    ret

    times  510-($-$$)  db 0
    db   0x55,0xaa
