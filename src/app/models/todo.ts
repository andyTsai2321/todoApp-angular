import { TodoStatus } from './todo-status.enum'

export class Todo {
  id: number;
  status: TodoStatus;
  name: string;

  selected:boolean;

  // any是讓他後面可以直接加id status name之類的
  constructor(obj: any = []) {
    this.id = obj.id;
    // 已經有在裡面就用傳進來的值，沒有的話就用預設的
    this.status = TodoStatus[obj.status] ?obj.status: TodoStatus.Active;
    this.name = obj.name;
  }

  get isCompleted(){
    return this.status === TodoStatus.Completed
  }

  switchStatus() {
    console.log(this.status)
    // 打勾後 active傳進來 active=active 改成completed
    // 取消打勾 comleted傳進來 !=active 改成active
    this.status = this.status === TodoStatus.Active ? TodoStatus.Completed : TodoStatus.Active;
  }
}
