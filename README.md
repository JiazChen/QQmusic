## 难点：进度条 progressBar
1. 进度条的运动与停止 per的累加 和 lastPer的累加
2. 拖拽时，per百分比的计算 disX = nowX - left;per = disX / width;
3. start函数的 拖拽百分比 参数处理 lastPer = dragPer == undefined ? lastPer : dragPer;
4. 中途 暂停 切歌时，lastPer 的值 要清零，初始化进度条和时间
    pro.stop(); //每次切换 关闭上一个 定时器 防止多个定时器打架
    pro.start(0); //每次切换 初始化lastPer = 0
    pro.stop(); // 初始化lastPer = 0之后，马上关闭这个 定时器
    pro.update(0); // 每次切换 初始化进度条

5. css 响应式正方形: padding 的百分比值是基于父级的 宽度
    width: 70%;height: 0;padding-top: 70%;