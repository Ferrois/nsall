function returnSeverityColor(degree){
    if (degree=="Mild") return "yellow.400"
    if (degree=="Moderate") return "orange.600"
    if (degree=="Severe") return "red.500"
    return "muted.400"
}
export default returnSeverityColor;
