#ifndef __LIB_STRING_H
#define __LIB_STRING_H  

void* memset(void* dst_, uint8_t value, uint32_t size);
void memcpy(void* dst_, const void* src_, uint32_t size);
int memcmp(const void* a_, const void* b_, uint32_t size);
char* strcpy(char* dst_, const char* src_);
uint32_t strlen(const char* str);
char* strcat(char* dst_, const char* src_);
char* strchr(const char* str, const uint8_t ch);
char* strrchr(const char* str, const uint8_t ch);
uint32_t strchrs(const char* str, const uint8_t ch);
int strcmp(const char* a_, const char* b_);
#endif