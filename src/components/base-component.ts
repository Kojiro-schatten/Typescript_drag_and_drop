namespace App {
  //Component Base Class
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
  
    constructor (
      templateId: string, 
      hostElementId: string, 
      insertAtStart: boolean,
      newElementId?: string
      ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
        // importNode = 後で現在の文書に挿入するために、他の文書から Node または DocumentFragment の複製を作成
        // .content = gives a reference to the content of the template.
        const importedNode = document.importNode(this.templateElement.content, true);
        // read-only property returns the object's first child Element, or null if there are no child elements.
        // 読み取り専用で、最初の子要素を返す。無ければ、nullを返す。
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
          this.element.id = newElementId;
        }
        this.attach(insertAtStart);
      }
      private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement (
          insertAtBeginning ? 'afterbegin' : 'beforeend', 
          this.element
      );
    }
    abstract configure(): void;
    abstract renderContent(): void;
  }
    
}