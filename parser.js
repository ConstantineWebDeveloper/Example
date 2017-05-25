const eraseProperty = ['', '', '', '', '', '', ''];

export function cloneClearFilter (obj) {
	if (null == obj || "object" != typeof obj) return obj;

	var copy = obj.constructor();
	for (var attr in obj) {
		if (eraseProperty.indexOf(attr) == -1) {
			if (obj.hasOwnProperty(attr)) copy[attr] = cloneClearFilter(obj[attr]);
		}
	}
	return copy;
}

const sortProperty = ['', '', ''];

export function cloneClearSort (obj) {
	if (null == obj || "object" != typeof obj) return obj;

	var copy = obj.constructor();
	for (var attr in obj) {
		if (sortProperty.indexOf(attr) > -1) {
			if (obj.hasOwnProperty(attr)) copy[attr] = cloneClearFilter(obj[attr]);
		}
	}
	return copy;
}

export function BrandParser (brand){
	if(brand) {
		let NonBacspace = brand.trim();
		NonBacspace = NonBacspace.toLocaleLowerCase();
		NonBacspace = NonBacspace.replace(/[ ,:]/ig, '-');

		let TransformString = NonBacspace.match(/[^ -]+/g).splice(0, 2)
		if (TransformString[1]) TransformString = TransformString[0] + '-' + TransformString[1];
		else TransformString = TransformString[0];

		return NonBacspace;
	}else{
		return false;
	}
}

   export function ParsePhoneNamber (СheckOperatorsBase){
   		СheckOperatorsBase = СheckOperatorsBase.split('(')[1].split(')')[0];
        switch (СheckOperatorsBase) {	
          case "093": return true; break;
          case "063": return true; break;
          case "065": return true; break;
          case "039": return true; break;
          case "050": return true; break;
          case "066": return true; break;
          case "067": return true; break;
          case "068": return true; break;
          case "091": return true; break;
          case "094": return true; break;
          case "095": return true; break;
          case "096": return true; break;
          case "065": return true; break;
          case "097": return true; break;
          case "098": return true; break;
          case "099": return true; break;
          case "073": return true; break;
          case "044": return true; break;
        default:
				return	false
      }
 		 };