#include "string.h"
#include "global.h"
#include "debug.h"
#include  "stdint.h"

void* memset(void* dst_, uint8_t value, uint32_t size){
    ASSERT(dst_!=NULL);
    //强转为--1字节的指针类型
    uint8_t* dst = (uint8_t*)dst_;
    while(size-->0){
        *dst=value;
        dst++;
    }
}


void memcpy(void* dst_, const void* src_, uint32_t size){
    ASSERT(dst_!=NULL && src_!=NULL);
    uint8_t* dst = (uint8_t*)dst_;
    const uint8_t* src = (const uint8_t*)src_;
    while(size-->0){
        *dst = *src;
        dst++;
        src++;
    }
}

int memcmp(const void* a_, const void* b_, uint32_t size){
    ASSERT(a_!=NULL && b_!=NULL);
    const uint8_t* a = (const uint8_t*)a_;
    const uint8_t* b = (const uint8_t*)b_;
    while(size-->0){
        if(*a != *b){
            return *a < *b ? -1:1;
        }
        a++;
        b++;
    }
    return 0;
}


char* strcpy(char* dst_, const char* src_){
    ASSERT(dst_!=NULL && src_!=NULL);
    char* dst = dst_;
    const char* src = src_;
    int i=0;
    while(src[i]!='\0'){
        dst[i]=src[i];
        i++;
    }
    dst[i]='\0';
    return dst_;
}



uint32_t strlen(const char* str){
    ASSERT(str!=NULL);
    uint32_t len=0;
    while(str[len]!='\0'){
        len++;
    }
    return len;
}

int8_t strcmp(const char* a_, const char* b_){
    ASSERT(a_!=NULL && b_!=NULL);
    const char* a = a_;
    const char* b = b_;
    int i=0;
    while(a[i]!='\0' && b[i]!='\0'){
        if(a[i]!=b[i]){
            return a[i]<b[i] ? -1:1;        
        }
        i++;
    }


    if(a[i]=='\0' && b[i]=='\0'){
        return 0;
    }
    else if(a[i]=='\0'){
        return -1;
    }
    else{
        return 1;
    }
}

char* strcat(char* dst_, const char* src_){
    ASSERT(dst_!=NULL && src_!=NULL);
    char* dst = dst_;
    const char* src = src_;
    int dst_len = strlen(dst);
    int i=0;
    while(src[i]!='\0'){
        dst[dst_len + i] = src[i];
        i++;
    }
    dst[dst_len + i] = '\0';
    return dst_;
}


char* strchr(const char* str, const uint8_t ch){
    ASSERT(str!=NULL);
    const char* s = str;
    while(*s!='\0'){
        if(*s==ch){
            return (char*)s;
        }
        s++;
    }
    return NULL;
}

char* strrchr(const char* str, const uint8_t ch){
    ASSERT(str!=NULL);
    const char* last_char = NULL;
    const char* s = str;
    while(*s!='\0'){
        if(*s==ch){
            last_char = s;
        }
        s++;
    }
    return (char*)last_char;
}


uint32_t strchrs(const char* str, const uint8_t ch){
    ASSERT(str!=NULL);
    uint32_t count=0;
    const char* s = str;
    while(*s!='\0'){
        if(*s==ch){
            count++;
        }
        s++;
    }
    return count;
}