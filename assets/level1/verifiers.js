export function A(t,s,c){
    if(t==1 && s!=1 && c!=1) return true;
    else if(t!=1 && s==1 && c!=1) return true;
    else if(t!=1 && s!=1 && c==1) return true;
    else return false;
}

export function B(t,s,c){
    if(s>c) return true;
    else return false;
}

export function C(t,s,c){
    if(t>c && t>s) return true;
    else return false;
}

export function D(t,s,c){
    if(t%2==1 && s%2==0 && c%2==0) return true;
    else if(t%2==0 && s%2==1 && c%2==0) return true;
    else if(t%2==0 && s%2==0 && c%2==1) return true;
    else return false;
}
