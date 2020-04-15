/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {

  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> 
    implements Draggable {
    private project: Project;
  
    // this.persons
    get persons() {
      if (this.project.people === 1) {
        return '1 person';
      } else {
        return `${this.project.people} persons`
      }
    }
  
    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }
  
    @Autobind
    dragStartHandler(event: DragEvent){
      // dataTransfer property is that the data transfer property and on that
      // property you attaach data to the "drag event!".
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }
  
    dragEndHandler(_: DragEvent) {
      console.log('DragEnd;')
    }
  
    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }
  
    renderContent() {
      // renderされた際に表示される中身。タイトル/人数/概要の順。
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
  
    }
  }
}