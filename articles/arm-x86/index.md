---
layout: engineering-education
status: publish
published: true
url: /engineering-education/arm-x86/
title: ARM vs x86 - Explained
description: 
author: mike-white
date: 2020-09-10T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/arm-x86/hero.jpg
    alt: 
---
Recently, Apple [announced their decision to switch from Intel CPUs to their own ARM chips](https://www.theverge.com/2020/6/22/21295475/apple-mac-processors-arm-silicon-chips-wwdc-2020). What's the difference? The new Apple Silicon chips are based on ARM CPUs, like the CPUs for iPhone and iPad. The Intel chips use Intel's proprietary x86 architecture.
<!--more-->

ARM is a [RISC architecture](https://www.section.io/engineering-education/what-is-risc/). RISC stands for Reduced Instruction Set Computing. This means that the CPU has a limited number of instructions it can use. As a result, each instruction runs in a single cycle and the instructions are simpler. Meanwhile, x86 is a CISC architecture, which stands for Complex Instruction Set Computing. This means that it has many more instructions. The exact number varies depending on how you count them, but x86-64 has [at least 981 instructions](https://stefanheule.com/blog/how-many-x86-64-instructions-are-there-anyway/). ARM, on the other hand, has [closer to 50](https://www.quora.com/How-many-instructions-are-there-in-the-ARM-architecture) (Actual documentation with ARM is hard to find, since it's only semi-open). Some of these instructions will take more than one cycle to execute. However, there are some instructions that can do the work of many RISC instructions.

Another benefit of ARM is that it's a semi-open architecture. [Very few companies manufacture x86 processors](https://en.wikipedia.org/wiki/List_of_x86_manufacturers), because it's closed-source. ARM doesn't actually manufacture their own CPUs. [They license the design out to other companies](https://developer.arm.com/support/licensing) who want to make their own CPUs. [Apple is one of them](https://en.wikipedia.org/wiki/Apple_Silicon). Apple is also able to customize their chips to work better on their platforms. That's presumably why [iPhones perform very well in benchmarks](https://benchmarks.ul.com/compare/best-smartphones?amount=200&sortBy=PERFORMANCE&reverseOrder=true&osFilter=ANDROID,IOS&test=SLING_SHOT_ES_30_UNLIMITED&deviceFilter=PHONE&displaySize=3.0,15.0).

ARM is commonly used in smartphones. It's smaller, more energy-efficient, and creates less heat.  This makes it perfect for mobile devices. The small size makes it great for tiny devices. The energy-efficiency gives the device a longer battery life. The lower heat is good for a device that's constantly being held. The same benefits appear in laptops.  Apple has historically had problems with overheating in [2020](https://www.macworld.co.uk/news/mac/2020-macbook-air-problems-3788127/), [2018](https://www.zdnet.com/article/apple-patches-2018-macbook-pro-to-address-throttled-performance-and-overheating/), [2015](https://www.theverge.com/2019/6/20/18693136/apple-recall-2015-15-inch-macbook-pro-battery-overheat-fire-risk-safety), and [older](https://discussions.apple.com/thread/5815813). ARM would allow Apple to make their MacBooks cooler. It would allow them to have longer battery life. [There's also a possibility of Apple's laptops getting smaller](https://www.forbes.com/sites/ewanspence/2020/07/20/apple-macos-bigsur-macbook-pro-arm-intel-advantages-danger/#1354fad339f7).

## Drawbacks of ARM

One problem is that x86 programs can't run on ARM. Programs will need to be completely rewritten to run on Apple's newer machines. Most programming languages can target ARM just fine. Any currently-maintained programs should have few problems. Anything written in [Assembly](https://www.section.io/engineering-education/articles/assembly-part-1/) will need to be rewritten to work on ARM though. The main problem is for programs that are no longer being updated. Apple has [Rosetta 2](https://www.theverge.com/21304182/apple-arm-mac-rosetta-2-emulation-app-converter-explainer), which can run x86 applications. However, Rosetta 1 was known for being much slower than running on original hardware. This is by necessity. Rosetta needs to translate the x86 instructions into ARM instructions in real-time. To be fair, Java converts from [bytecode to everything else](https://www.javatpoint.com/java-bytecode), and it seems to work [fine-ish](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/java.html). Still, it seems hard to imagine being able to play games from the 2010's if Microsoft also decides to switch to ARM.

There's also an issue of speed. Since ARM has fewer instructions, developers need to use more instructions. For example, did you know that [ARM usually doesn't have a division instruction](https://cseweb.ucsd.edu/classes/wi14/cse30-c/lectures/PI_WI_14_CSE30_lecture_8_post.pdf)? You have to divide by using [other instructions](https://stackoverflow.com/questions/19844575/how-to-do-division-in-arm). Since you're using other instructions to fake division, it ends up taking many cycles. This could even be slower than on a CISC instruction set.

### Executable Sizes

Since you need more instructions in ARM, it's possible that executables will be larger. To test this, we can compile the [sorting_algos repository](https://github.com/botahamec/sorting_algos) made for our [sorting article.](https://www.section.io/engineering-education/sorting-algorithms/). It was run on a [Raspberry Pi 4 Model B Rev 1.1](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/). The same program was compiled on an x86-64 Linux desktop. The Raspberry Pi file size would normally be a little smaller because of the 32-bit operating system (Raspberry Pi OS Lite). So, the desktop cross-compiled to the stable-i686-unknown-linux-gnu toolchain. "Stripped" means that nonessential symbols were stripped from the executable. The Cargo profiles used for this are at the bottom. Here are the results:

|                                  | x86-32  | ARM-32  |
| -------------------------------- | ------- | ------- |
| Unoptimized (unstripped)         | 4.39 MB | 4.29 MB |
| Unoptimized (stripped)           | 595 KB  | 407 KB  |
| Optimized for speed (unstripped) | 2.71 MB | 2.75 MB |
| Optimized for speed (stripped)   | 317 KB  | 231 KB  |
| Optimized for size (unstripped)  | 1.14 MB | 1.13 MB |
| Optimized for size (stripped)    | 272 KB  | 206 KB  |

Yes, that's correct. The ARM executable files actually ended up being smaller than the x86 executables. The exact reason why this happened is unclear. It's probably a combination of a few issues:

* ARM has more registers, so fewer instructions are necessary to move between them.
* x86 has variable-length instructions, which can be up to 120 bits. All ARM instructions are 32 bits ([on most machines](https://developer.arm.com/documentation/ddi0211/i/programmer-s-model/instruction-length)).
* The Rust compiler is using some black magic voodoo to optimize the ARM version. For some reason, it isn't doing this on the x86 version.

## Conclusion

It seems like ARM is a very good possibility for the future. It's likely that many of the issues here will be resolved in the future. It's possible we end up with something like the 32-bit vs 64-bit era, where programs were compiled for both. It'll be a while until we see what happens, but ARM seems like a very good contender for the future.

## Cargo Profiles

Unoptimized: default debugging profile

Optimized for speed:

```toml
opt-level = 3
debug = false
debug-assertions = false
overflow-checks = false
lto = false
panic = 'abort'
incremental = false
codegen-units = 1
rpath = false
```

Optimized for size:

```toml
opt-level = 's'
debug = false
debug-assertions = false
overflow-checks = false
lto = true
panic = 'abort'
incremental = false
codegen-units = 1
rpath = false
```
