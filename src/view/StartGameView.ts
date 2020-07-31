// 进入游戏界面
class StartGameView extends eui.Component implements eui.UIComponent {
  // 开始游戏背景
  private start_bg: eui.Rect;
  // 开始游戏界面
  private start_group: eui.Group;
  // 开始按钮
  private start_button: eui.Button;
  // 规则按钮
  private rules_button: eui.Button;
  // 排行榜
  private ranking_button: eui.Button;
  // 喇叭
  private trumpet_check: eui.Group;
  // 喇叭声音图标
  private is_trumpet: eui.Image;
  // 朱望仔图片
  private pig_bg_img: eui.Image;
  // 大反派图片
  private batman_bg_img: eui.Image;

  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  // 组件实例化完之后，自动调用这个函数
  private onComplete() {
    // 设置音乐播放状态
    this.is_trumpet.visible = LoadBGM.getInstance().getPlayStatus();
    // 侦听开始按钮的触摸点击事件
    this.start_button.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.startButton,
      this
    );

    // 当用户第一次触摸启用触摸的设备时触发
    this.start_button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startBtnBegin, this)
    // 当用户在触摸设备上与开始触摸的不同 DisplayObject 实例上抬起接触点时
    this.start_button.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.startBtnReleaseOutside, this)

    // 侦听排行榜按钮的触摸点击事件
    this.ranking_button.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.rankingButton,
      this
    );

    // 侦听声音按钮的触摸点击事件
    this.trumpet_check.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.trumpetCheck,
      this
    );
  }

  private startBtnBegin() {
    console.log('startBtnBegin');
    egret.Tween.get(this.start_button).to({ scaleX: 0.95, scaleY: 0.95 }, 150)
  }

  private startBtnReleaseOutside() {
    console.log('startBtnReleaseOutside');
egret.Tween.get(this.start_button).to({ scaleX: 1, scaleY: 1 }, 150)
  }

  private startButton() {
    // 隐藏开始游戏界面
    this.parent.removeChild(this);
    // 构建一个事件
    let p: PostEvent = new PostEvent(PostEvent.START_GAME);
    // 派发出去
    this.dispatchEvent(p);
  }

  // 排行榜
  private rankingButton() {
    this.dispatchEvent(new PostEvent(PostEvent.Ranking_List))
  }

  // 喇叭声音切换
  private trumpetCheck() {
    // 获取声音实例
    const s = LoadBGM.getInstance();
    // 切换播放状态
    s.SwitchPlay();
    // 切换音标图标
    if (s.getPlayStatus()) {
      this.is_trumpet.visible = true;
    } else {
      this.is_trumpet.visible = false;
    }
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  //元素第一次被添加到舞台时回调一次。此时才可以获取元素
  protected createChildren(): void {
    super.createChildren();

    this.start_button.anchorOffsetX = this.start_button.width / 2;
    this.start_button.anchorOffsetY = this.start_button.height / 2;
  }

  // 创建元素之后，被回调执行,紧接 onComplete 之后
  protected childrenCreated(): void {
    super.childrenCreated();
    // 动画出现
    this.startAnimate();
  }

  private startAnimate() {
    egret.Tween.get(this.pig_bg_img, { loop: true }).to({ x: 45, y: -96 }, 1000).wait(100)
      .to({ x: 42.87, y: -88.13 }, 1000).wait(100)
    egret.Tween.get(this.batman_bg_img, { loop: true }).to({ rotation: 5, width: 280, height: 211.6 }, 1000).wait(100)
      .to({ rotation: 0, width: 270, height: 201.6 }, 1000).wait(100)
  }
}
