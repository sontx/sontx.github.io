# 🛠️ Jekyll Setup Guide for Windows

This guide helps you install **Ruby**, **Bundler**, and **Jekyll** on a Windows machine using the official RubyInstaller.

---

## 📦 Prerequisites

### ✅ Install Ruby with MSYS2

1. Download the latest Ruby+Devkit version from [https://rubyinstaller.org/](https://rubyinstaller.org/).

2. Run the installer and **keep these options checked** when prompted:

```

\[x] Ruby RI and HTML documentation
\[x] MSYS2 development toolchain

````

3. After installation, a terminal will open. Type:

```bash
ridk install
````

Select option `1` when prompted:

```
1. MSYS2 and MINGW development toolchain
```

---

## 📦 Install Jekyll and Bundler

Once Ruby is installed and MSYS2 is set up, open **Command Prompt** or **PowerShell**, and run:

```bash
gem install bundler jekyll
```

If you encounter permission issues, run:

```bash
ridk enable
gem install bundler jekyll
```

---

## ✅ Verify Installation

Check versions to verify success:

```bash
jekyll -v
bundler -v
```

Expected output:

```
jekyll x.x.x
Bundler version x.x.x
```

---

## 🛠 Common Troubleshooting

* **SSL or certificate errors**:

  ```bash
  ridk install
  gem update --system
  ```

* **Native gem install errors**:
  Ensure you did **not skip MSYS2** and `ridk install` steps.

* **Permission denied**:
  Try running the command prompt as **administrator**, or use `ridk enable`.

---

## 📘 Resources

* Official Jekyll Docs: [https://jekyllrb.com/docs/](https://jekyllrb.com/docs/)
* RubyInstaller: [https://rubyinstaller.org/](https://rubyinstaller.org/)
