// https://www.bilibili.com/video/BV1XZ4y1y7BX?spm_id_from=333.880.my_history.page.click
function createTask(i) {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, 2000);
    });
  };
}
class TaskQueue {
  constructor() {
    this.max = 10;
    this.taskList = [];
    setTimeout(() => {
      this.run();
    });
  }
  addTask(task) {
    this.taskList.push(task);
  }
  run() {
    const length = this.taskList.length;
    if (!length) return;
    const min = Math.min(this.max, length);
    for (let i = 0; i < min; i++) {
      this.max--;
      const task = this.taskList.shift();
      task()
        .then((i) => {
          console.log(i);
        })
        .catch()
        .finally(() => {
          this.max++;
          this.run();
        });
    }
  }
}
const taskQueue = new TaskQueue();
for (let i = 0; i < 20; i++) {
  const task = createTask(i);
  taskQueue.addTask(task);
}
