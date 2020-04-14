
// autobind decorator
// _, _2で使わないが必要なものとして認識。
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // store the original method
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    // configurable: true => we always change it.
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      // boundFn = originalMethod so the new fn will be returned.
      return boundFn;
    }
  };
  return adjDescriptor;
}

//ProjectInput Class
class ProjectInput {
  // HTMLTemplateElementはグローバルで使用可能
  templateElement: HTMLTemplateElement;
  // div #id と接続
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  inputInputElement: HTMLInputElement;


  constructor() {
    // as HTMLTemplateElementでTS上でHTMLファルを認識させる。
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // importNode = 後で現在の文書に挿入するために、他の文書から Node または DocumentFragment の複製を作成
    // .content = gives a reference to the content of the template.
    const importedNode = document.importNode(this.templateElement.content, true);
    // read-only property returns the object's first child Element, or null if there are no child elements.
    // 読み取り専用で、最初の子要素を返す。無ければ、nullを返す。
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // formにidを挿入
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.inputInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    // thisによりsubmitHandlerも繋げられる
    // bindが無いときのエラー。Cannot read property 'value' of undefined at HTMLFormElement.submitHandler
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    // 第二引数で指定するテキストを HTML または XML としてパースし、その結果であるノードを DOM ツリー内の指定された位置（第一引数で指定）に挿入
    // afterbeginなので、app内部の最初の子要素として挿入される。
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
