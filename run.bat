@echo off
call npm run build
echo adb_run
adb push ./src/WorldEditorBP /storage/emulated/0/Android/data/com.mojang.minecraftpe/files/games/com.mojang/development_behavior_packs
adb push ./src/WorldEditorRP /storage/emulated/0/Android/data/com.mojang.minecraftpe/files/games/com.mojang/development_resource_packs
echo ok...