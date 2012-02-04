@echo off&SETLOCAL

IF /I "%PROCESSOR_ARCHITECTURE%" == "amd64" (
	echo 64bit
) ELSE IF /I "%PROCESSOR_ARCHITEW6432%" == "amd64" (
	echo 64bit
) ELSE (
	echo 32bit
)