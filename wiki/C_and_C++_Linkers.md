# Linking
Compilations for C/C++ code typically include four stages: preprocessing, compilation, assemble, and linking. See the diagram below:
![](/Compilation.png)

During the actual compilation stage, the reference is not resolved, which means that the compilation could succeed if the function declaration (interface) could be found even if the definition does not present.

The main job of the linker is to map the definition of variables and functions to the declaration. Unlike a function, a variable does not always have a definition. There are two types of variables, local variables and global variables. Local variables have block scopes and are stored in registers or on the stack; Initialized and uninitialized global variables are stored in the data and the bss segment, respectively. The definition of global variables are resolved by the linker. For variables that are declared as "extern", meaning that it is defined elsewhere, the linker would try to find a definition which has an external linkage, i.e. a definition that is not declared as "static". Whether the variable is declared at the module level or not, declaring as "extern" or "static" makes it as a global variable. On the contrary, a function has to be defined to be called. For both C and C++, there has to be exactly one definition for a function, called one definition rule in C++. Otherwise, the linker raises duplicate symbol errors.

There are a few fundamental functions and variables that are used in most of the executables, such as IO utility, and it makes sense to share the code. Static libraries, files produced by `ar` and ends with ".a", implement common functions and could be compiled with programs. A static libraries might be composed of several object files. The text segment of the object files are copied to the final executables if any of its function has been called.

For popular libraries like C standard library, including them in every executable takes up lots of unnecessary disk space. Dynamic linking are intended to solve that. Shared libraries, the files ended with .so, are compiled and linked in advanced and are stored somewhere in the operating system. Instead of copying the text segment to the executables, the linker resolves it at runtime. It `mmap` the text segment into the process's address space when the program starts and resolves the call to a jmp instruction to the virtual address.

# Reference
- https://stackoverflow.com/questions/14335742/can-local-and-register-variables-be-declared-extern
- https://dev.to/abhinavmir/from-source-to-binaries-the-journey-of-a-c-program-4hlj
