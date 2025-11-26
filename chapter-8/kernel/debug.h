#ifndef  __kERNEL_DEBUG_H
#define  __kERNEL_DEBUG_H
    
void debug_print(const char* filename, int line, const char* func_name, const char* condition);

#define DEBUG(...) debug_print(__FILE__, __LINE__, __func__, __VA_ARGS__)


#ifdef NDEBUG
    #define ASSERT(CONDITION) ((void)0)
#else
    #define ASSERT(CONDITION) \
        if(CONDITION) {         \
        } else {                            \
            DEBUG(#CONDITION);              \
        }

#endif
#endif