class cola{
    constructor(){this.cola = [];}
    enqueue(cancion){this.cola.push(cancion);}
    dequeue(){if (this.cola.lenght === 0){return null;}return this.cola.shift()}
    mostrar(){return this.cola;}

}

const colaCanciones = new cola();

