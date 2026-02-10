@echo off
echo COPYING NEW FILES...
xcopy CipherSaga-Ref-main\* . /E /Y
if %errorlevel% neq 0 (
    echo ERROR: Could not copy files.
    pause
    exit /b
)

echo FILES COPIED SUCCESSFULLY.
echo REMOVING TEMP FOLDER...
rmdir CipherSaga-Ref-main /S /Q

echo DONE! Output should define success.
pause
