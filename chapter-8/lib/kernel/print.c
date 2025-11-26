#include "print.h"
#include <stdarg.h>

void printf(const char *format, ...) {
    va_list args;
    va_start(args, format);

    char *s;
    int d;
    char c;

    while (*format) {
        if (*format != '%') {
            put_char(*format);
        } else {
            format++;
            switch (*format) {
                case 's':
                    s = va_arg(args, char*);
                    put_str(s);
                    break;
                case 'c':
                    c = (char)va_arg(args, int);
                    put_char(c);
                    break;
                case 'd':
                    d = va_arg(args, int);
                    put_int(d);
                    break;
                case 'x':
                    d = va_arg(args, int);
                    put_hex(d);
                    break;
                default:
                    put_char('%');
                    put_char(*format);
            }
        }
        format++;
    }

    va_end(args);
}
