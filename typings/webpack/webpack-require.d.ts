interface Irequire {
    (str: string): any;
    ensure(cage: string, obj: Function);
}
declare var require: Irequire;