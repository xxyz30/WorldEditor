@echo off
call npm run build
echo adb_run
adb push ./scripts /storage/emulated/0/Android/data/com.mojang.minecraftpe/files/games/com.mojang/development_behavior_packs/WorldEditor
echo ok...