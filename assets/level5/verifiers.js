export function A(t,s,c){
    if(t%2+s%2+c%2<=1) return true;
    else return false;
}

export function B(t,s,c){
    if(s==c-1 && t!=s-1) return true;
    else if(t==s-1 && s!=c-1) return true;
    else return false;

}

export function C(t,s,c){
    if(s>3) return true;
    else return false;
}

export function D(t,s,c){
    if(t<s && t<c) return true;
    else return false;
}

export function E(t,s,c){
    if(t!=3 && s!=3 && c!=3) return true;
    else return false;
}