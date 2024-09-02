import { LinkedList } from "./linkedList.js";
import util from "util";

class HashMap {
  constructor() {
    this.buckets = this.createBuckets();
  }
  createBuckets(numOfBuckets = 16) {
    let buckets = [];
    for (let i = 0; i < numOfBuckets; i++) {
      buckets.push(new LinkedList());
    }
    return buckets;
  }
  calculateLoadFactor() {
    let numOfBuckets = this.buckets.length;
    let entries = this.length();

    return entries / numOfBuckets;
  }
  addBuckets() {
    let newBuckets = this.createBuckets();
    newBuckets.forEach((bucket) => {
      this.buckets.push(bucket);
    });
  }
  checkBucketsCapacity() {
    let loadFactor = this.calculateLoadFactor();
    if (loadFactor >= 0.75) {
      this.addBuckets();
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
  set(key, value) {
    let hashedKey = this.hash(key);
    let bucketIndex = hashedKey % this.buckets.length;
    let bucket = this.buckets[bucketIndex];
    if (bucket.contains(key)) {
      let index = bucket.find(key);
      bucket.removeAt(index);
    }
    bucket.append(key, value);
    this.checkBucketsCapacity();
  }
  get(key) {
    let hashedKey = this.hash(key);
    let bucketIndex = hashedKey % this.buckets.length;
    let bucket = this.buckets[bucketIndex];
    if (bucket.contains(key)) {
      let index = bucket.find(key);
      let node = bucket.at(index);
      return node.value;
    }
    return null;
  }
  has(key) {
    let hashedKey = this.hash(key);
    let bucketIndex = hashedKey % this.buckets.length;
    let bucket = this.buckets[bucketIndex];
    return bucket.contains(key);
  }
  remove(key) {
    let hashedKey = this.hash(key);
    let bucketIndex = hashedKey % this.buckets.length;
    let bucket = this.buckets[bucketIndex];
    if (bucket.contains(key)) {
      let index = bucket.find(key);
      bucket.removeAt(index);
    } else return false;
  }
  length() {
    let sum = 0;
    let buckets = this.buckets;
    buckets.forEach((bucket) => {
      sum += bucket.size;
    });
    return sum;
  }
  clear() {
    let buckets = this.buckets;
    buckets.forEach((bucket) => {
      bucket.head = null;
    });
  }
  keys() {
    let buckets = this.buckets;
    let keyArray = [];
    buckets.forEach((bucket) => {
      let array = bucket.keys();
      array.forEach((element) => {
        keyArray.push(element);
      });
    });

    return keyArray;
  }
  values() {
    let buckets = this.buckets;
    let valueArray = [];
    buckets.forEach((bucket) => {
      let array = bucket.values();
      array.forEach((element) => {
        valueArray.push(element);
      });
    });

    return valueArray;
  }
  entries() {
    let buckets = this.buckets;
    let entriesArray = [];
    buckets.forEach((bucket) => {
      if (bucket.entries().length > 0) {
        entriesArray.push(bucket.entries());
      }
    });
    return entriesArray;
  }
}
