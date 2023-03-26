import {AbstractControl} from "@angular/forms";

export function validarEspacios(abstractControl:AbstractControl){

  if(abstractControl == null){
    return null;
  }

  if(abstractControl.value.includes(' ')){
    return { contieneEspacios : true }
  }
  return null;
}

export function validarSeleccion(abstractControl:AbstractControl){

  if(abstractControl == null){
    return null;
  }

  if(abstractControl.value.length == 0){
    return { nadaSeleccionado : true }
  }
  return null;
}


export function validarCaracteresEspeciales(abstractControl:AbstractControl) {

  let charactersEspecial = "#&$<>\t\"™\t[\t]\t'%\t‰€¡!=¤\t¦¨©ª\tº«\t¬®\t¯\t°\t¹²\t³´\tµ\t¶\t·¸\t±»¼½¾¿\t?çñÑ÷×\t⁄\t+\t\\\t*\tø•\t:;\t…′\t″\t‾←\t↑\t→\t↓\t↵ℑℜ⇐⇑⇒\t⇓⇔\t∀\t∂\t∃∅∇\t∈\t∉\t∋\t∏\t∑−∗\t√∝\t∞∧\t∨\t∩\t∪\t∫\t∴∼\t≅\t≈\t≠\t≡\t≤≥\t⊂\t⊃\t⊄⊆\t⊇⊕\t⊗\t⊥\t⋅\tα\tβγ\tδ\tε\tπρ\tθ\tκ\tζ\tηλ\tμνξ\tστυφχ\tψωΩ\tΔáéíóúÁÉÍÓÚàèòäÄëËïÏöÖüÜ";
  if(abstractControl == null){
    return null;
  }

  for (let char of charactersEspecial) {
    if (abstractControl.value.includes(char)){
      return { contieneCaracteresEspeciales : true }
    }
  }

  return null;
}


