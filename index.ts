import './style.css';
import { Subject } from 'rxjs';

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const s = new Subject<number>();
s.subscribe(n => console.log(n));
s.subscribe(n => appDiv.innerHTML += `<br>${n}`);
s.next(1);
s.next(2);


type Observer<T> = (value: T) => void;

export class MySubject<T> {

  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>) {
    this.observers.push(observer);
  }
  
  next(t: T) {
    this.observers.forEach(o => {
      o.call(this, t);
    })
  }
}

const ms = new MySubject<number>();
ms.subscribe(n => console.log(n));
ms.subscribe(n => appDiv.innerHTML += `<br>${n}`);
ms.next(3);
ms.next(4);