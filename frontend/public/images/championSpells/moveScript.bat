@echo off
setlocal enabledelayedexpansion

:: Loop through all .png files in the current directory
for %%f in (*.png) do (
    set "fileName=%%~nf"
    set "fileExtension=%%~xf"
    set "validSkill=0"

    :: Check if the filename ends in "_Passive"
    echo Processing %%f
    if "!fileName:~-8!"=="_Passive" (
        set "championName=!fileName:~0,-8!"
        set "validSkill=1"
    ) else (
        :: Extract the champion name (all characters before the last letter) and skill (last letter)
        set "championName=!fileName:~0,-1!"
        set "skill=!fileName:~-1!"

        :: Check if the skill is Q, W, E, or R
        if /I "!skill!"=="Q" (
            set "validSkill=1"
        ) else if /I "!skill!"=="W" (
            set "validSkill=1"
        ) else if /I "!skill!"=="E" (
            set "validSkill=1"
        ) else if /I "!skill!"=="R" (
            set "validSkill=1"
        )
    )

    :: Move the file if it has a valid skill or ends in "_Passive" and the champion folder exists
    if !validSkill!==1 if exist "!championName!" (
        move "%%f" "!championName!\"
        echo Moved %%f to folder "!championName!\"
    ) else (
        echo Skipping %%f - no matching champion folder or invalid skill
    )
)

endlocal
pause
