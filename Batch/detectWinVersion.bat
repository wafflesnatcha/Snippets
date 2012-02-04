:: How to detect Windows Vista in batch file or logon script

:: Previously, in our logon scripts, we'd used the 'ver' command to get the
:: windows version, and selected the third word (XP or 2000 etc) but now that 
:: no longer works properly, so a better way of doing it is this:

SET Version=Unknown

VER | FINDSTR /IL "5.0" > NUL
IF %ERRORLEVEL% EQU 0 SET Version=2000

VER | FINDSTR /IL "5.1." > NUL
IF %ERRORLEVEL% EQU 0 SET Version=XP

VER | FINDSTR /IL "5.2." > NUL
IF %ERRORLEVEL% EQU 0 SET Version=2003

VER | FINDSTR /IL "6.0." > NUL
IF %ERRORLEVEL% EQU 0 SET Version=Vista

VER | FINDSTR /IL "6.1." > NUL
IF %ERRORLEVEL% EQU 0 SET Version=7

:: This searches for the build number in the ver string. 