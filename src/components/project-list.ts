/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {

  // projectList class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> 
      implements DragTarget{
      assignedProjects: Project[];
    
      constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];
    
        this.configure();
        this.renderContent();
      }
    
      @Autobind
      dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
          // default JS drag n drop events is not to allow dropping. So preventDefault is needed.
          event.preventDefault();
          const listEl = this.element.querySelector('ul')!;
          listEl.classList.add('droppable');
        }
      }
    
      @Autobind
      dropHandler(event: DragEvent) {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? 
        ProjectStatus.Active : ProjectStatus.Finished);
      }
    
      @Autobind
      dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
      }
    
      configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    
        projectState.addListener((projects: Project[]) => {
          // レンダーする前に、新しいリストを作って、それにfilter関数をかける
          const relevantProjects = projects.filter(prj => {
            if(this.type === 'active') {
              return prj.status === ProjectStatus.Active;
            } 
            return prj.status === ProjectStatus.Finished;
          });
          this.assignedProjects = relevantProjects;
          this.renderProjects();
        })
      }
    
      renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        // type = active or finished(constructor)
        this.element.querySelector('h2')!.textContent = 
          this.type.toUpperCase() + 'PROJECTS'
      }
    
      private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
          new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
      }
    }
}