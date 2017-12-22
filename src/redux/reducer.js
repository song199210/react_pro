export const reducer=((state=[],action)=>{
    switch(action.type){
        case "ADD":
            state.push(action.data);
            return state;
        case "DEL":
            return state.filter((item,index)=>{
                return item.name != action.data.name;
            });
        default:
            return state;
    }
});