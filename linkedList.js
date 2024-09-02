class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
export class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
  append(key, value) {
    let node = new Node(key, value);
    if (this.head == null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }
  prepend(key, value) {
    let node = new Node(key, value);
    node.next = this.head;
    this.head = node;
  }
  get size() {
    let size = 0;
    if (!this.head) return size;
    if (this.head) {
      size++;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
      size++;
    }
    return size;
  }
  get getHead() {
    return this.head;
  }
  get tail() {
    let current = this.head;
    if (!current) return null;
    while (current.next) {
      current = current.next;
    }
    return current;
  }
  at(index) {
    let current = this.head;
    let i = 0;
    if (current) {
      while (current.next) {
        if (i == index) return current;
        current = current.next;
        i++;
      }
      if (i == index) return current;
    }
    return -1;
  }
  pop = () => {
    let current = this.head;
    if (!current) {
      return;
    }
    if (current.next) {
      while (current.next.next) {
        current = current.next;
      }
      current.next = null;
    } else this.head = null;
  };

  contains(value) {
    let current = this.head;
    if (current) {
      while (current.next) {
        if (value == current.key) return true;
        current = current.next;
      }
      if (value == current.key) return true;
    }
    return false;
  }
  keys() {
    let current = this.head;
    let keyArray = [];
    if (current) {
      while (current.next) {
        keyArray.push(current.key);
        current = current.next;
      }
      keyArray.push(current.key);
    }
    return keyArray;
  }
  values() {
    let current = this.head;
    let valuesArray = [];
    if (current) {
      while (current.next) {
        valuesArray.push(current.value);
        current = current.next;
      }
      valuesArray.push(current.value);
    }
    return valuesArray;
  }
  entries() {
    let current = this.head;
    let entriesArray = [];
    if (current) {
      while (current.next) {
        entriesArray.push(`${current.key},${current.value}`);
        current = current.next;
      }
      entriesArray.push(`${current.key},${current.value}`);
    }
    return entriesArray;
  }

  find(value) {
    let current = this.head;
    let i = 0;
    if (current) {
      while (current.next) {
        if (value == current.key) return i;
        current = current.next;
        i++;
      }
      if (value == current.key) return i;
    }
    return null;
  }

  get toString() {
    let current = this.head;
    let stringOutput = "";
    if (current) {
      while (current.next) {
        stringOutput += `( ${current.key} ) -> `;
        current = current.next;
      }
      stringOutput += `( ${current.key} ) -> `;
      stringOutput += `null`;
    }
    return stringOutput;
  }
  insertAt(key, value, index) {
    let node = new Node(key, value);
    let current = this.head;
    let i = 0;
    let prevNode;
    let nextNode;
    if (index == 0) {
      this.prepend(value);
      return;
    }
    if (index > this.size) {
      console.error("Index outside the range of the list");
      return;
    }
    if (index < 0) {
      console.error("Index can't be negative!");
    }
    if (current) {
      while (current.next) {
        if (i == index - 1) {
          prevNode = current;
          if (current.next) {
            nextNode = current.next;
          }
          prevNode.next = node;
          if (nextNode) {
            node.next = nextNode;
          }
        }
        current = current.next;
        i++;
      }
      if (index - 1 == i) {
        this.append(value);
      }
    } else {
      this.prepend(value);
    }
  }

  removeAt(index) {
    let current = this.head;
    let i = 0;
    let prevNode;
    let nextNode;

    if (current) {
      if (index == 0) {
        this.head = current.next;
      }
      while (current.next) {
        if (i == index - 1) {
          prevNode = current;
          if (current.next.next) {
            nextNode = current.next.next;
          }
          if (prevNode && nextNode) {
            prevNode.next = nextNode;
          }
          if (prevNode && !nextNode) {
            this.pop();
            return;
          }
        }
        current = current.next;
        i++;
      }
    }
  }
}
