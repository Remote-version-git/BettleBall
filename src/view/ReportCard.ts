// 成绩单
class ReportCard extends eui.Component implements eui.UIComponent {
  // 返回
  private go_back: eui.Button;

  // 成绩
  public score: eui.Label;

  private nickname: eui.Label;

  public constructor() {
    super();
    this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
  }

  private onComplete() {
    this.go_back.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.goBack,
      this
    );
  }

  private goBack() {
    // 销毁自己的界面
    this.parent.removeChild(this);
    this.dispatchEvent(new PostEvent(PostEvent.GAME_OVER, false, false, Number(this.score.text)));
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected childrenCreated(): void {
    super.childrenCreated();
    if (window && window.playerInfo && window.playerInfo.nickname) {
      this.nickname.text = window.playerInfo.nickname;
    } else {
      this.nickname.text = "获取名称失败";
    }
  }
}