http://www.catb.org/esr/structure-packing/

Each type must start on an address divisible by sizeof(type). For example, 4-byte ints or floats must start on an address divisible by 4. Paddings are added between types to ensure the alignment requirement:

On a 64-bit machine
```
char *p;      /* 8 bytes */
char c;       /* 1 byte */
char pad[3];  /* 3 bytes */
int x;        /* 4 bytes */
```

This rule infers the following lemmas:
1. Struct instances align to their widest scalar. This applies to the inner struct too. For example, on a 64-bit machine,
```
struct foo1 {
    char *p;     /* 8 bytes */
    char c;      /* 1 byte
    char pad[7]; /* 7 bytes */
    long x;      /* 8 bytes */
};
```
starts on an address divisible by 8.
```
struct foo5 {
    char c;           /* 1 byte*/
    char pad1[7];     /* 7 bytes */
    struct foo5_inner {
        char *p;      /* 8 bytes */
        short x;      /* 2 bytes */
        char pad2[6]; /* 6 bytes */
    } inner;
};
```
2. Trailing padding: The size of struct instances are padded to multiples of their widest scalar for continuity in the struct array. For example,
```
struct foo3 {
    char *p;     /* 8 bytes */
    char c;      /* 1 byte */
    char pad[7];
};
```
And consider `foo3 foo3s[2]`.