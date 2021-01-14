import { MapActions, StringActions } from './actions';

export interface Item {
  _id: string;
  _hidden: boolean;
  _name: string;
  _quantity: number;
  _durability: number;
  _description: string;
  _obtainable: boolean;
  _destroyed: boolean;
  _messages: StringActions;
  _outcomes: MapActions;
  _taken: boolean;
  _value: number;
}

export class Item implements Item {
  constructor(id: string, item: any) {
    this._id = id;
    this._name = item.name;
    this._quantity = item.quantity;
    this._durability = item.durability;
    this._description = item.description;
    this._destroyed = false;
    this._obtainable = item.obtainable ? item.obtainable : false;
    this._hidden = item.hidden ? item.hidden : false;
    this._taken = item.taken ? item.taken : false;
    this._value = item.value;
    this._messages = item.messages;
    this._outcomes = this.loadOutcomes(item.outcomes);
  }

  public isDestroyed() {
    return this._destroyed;
  }

  public isHidden() {
    return this._hidden;
  }

  public isObtainable() {
    return this._obtainable;
  }

  public wasTaken() {
    return this._taken;
  }

  public getId() {
    return this._id;
  }

  public getName() {
    return this._name;
  }

  public getQuantity() {
    return this._quantity;
  }

  public getDescription() {
    return this._description;
  }

  public getDurability() {
    return this._durability;
  }

  public destroy() {
    this._destroyed = true;
  }

  public take() {
    this._taken = true;
  }

  public getAquisitionMessage() {
    const messages = this._messages.aquire;
    return messages
      ? messages[Math.floor(Math.random() * messages.length)]
      : '';
  }

  public getUsageMessage() {
    const messages = this._messages.usage;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  public getUsageOutcome(tileId: string) {
    const outcome = this._outcomes.usage.get(tileId);
    return outcome !== undefined ? outcome : null;
  }

  private objectMapper(objectToMap: any, action: string) {
    const map = new Map<string, string>();

    if (objectToMap !== undefined) {
      if (objectToMap[action] !== undefined) {
        objectToMap[action].forEach((key: any) => {
          map.set(key[0], key[1]);
        });
      }
    }

    return map;
  }

  private loadOutcomes(outcomesArray: any): any {
    const usage = this.objectMapper(outcomesArray, 'usage');
    //   const aquire = "";
    //   const bellicose = "";
    //   const manipulation = "";
    //   const movement = "";
    //   const observation = "";
    //   const speech = "";
    //   const support = "";

    return {
      usage,
    };
  }
}
