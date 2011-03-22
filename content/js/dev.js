var devCheck = 1;

function dev() {
	document.getElementById('tipType').innerHTML+='<option title="Dev Input (don\'t touch)">Dev Input</option>';
	document.textpad.pad.value = '';
//Ddppn5();
//DcheckWords();
//DcompareMAT();
}

function devO(data) {
	document.textpad.pad.value = data;
	//moveframey('scf')

}

function DevInput(string) {
	Ddppnsearchstart(string);
}

function Ddppn5() {
	var finout = '';

    for (x in DnameDa)
	{
		var y = DnameDa[x][0].replace(/, /g, ',').split(',');
		for (z in y) {
			finout +="nameda['"+toVel(y[z].replace(/[-(). ]/g,''))+"'] = '"+DnameDa[x][1]+"';\n"; 
		}
	}
	devO(finout);
	return;
}

function Ddppn4() {
	var matched = [];
	var unmatched = [];
	var w,x, y;
	out:
	for (i in dppng) {
		 x = dppng[i][0].replace(/_th$/,'thera').replace(/_v_s$/,'vagga').replace(/_s_v$/,'sutta').replace(/_s$/,'sutta').replace(/_jat_.+/,'jaataka').replace(/_j_.+/,'jaataka').replace(/_/g,'');
		 w = toVel(dppng[i][1].toLowerCase()).replace(/[ -]/g, '');
		if (nameda[x]) {
			matched[dppng[i][0]+'^'+dppng[i][1]] = x;
			continue out;
		}
		if (nameda[w]) {
			matched[dppng[i][0]+'^'+dppng[i][1]] = w;
			continue out;
		}
		y = dppng[i][1].toLowerCase();
		for (j in nameda) {
			if (j.indexOf(x) == 0 || toFuzzy(j).indexOf(toFuzzy(x)) == 0  || toFuzzy(j).indexOf(toFuzzy(w)) == 0 || nameda[j][0].indexOf(y) == 0) {
				matched[dppng[i][0]+'^'+dppng[i][1]] = j;
				continue out;
			}
		}
		unmatched[dppng[i][0]+'^'+dppng[i][1]] = '';
		//if(unmatched.length > 10) break;
	}
	
	var outs = 'var nameno = [];\n// matched\n';
	
	for (i in matched) {
		outs += "nameno['"+i+"'] = '"+matched[i]+"';\n";
	}
	
	outs += '\n\n\n// unmatched\n\n';
	
	for (i in unmatched) {
		outs += "nameno['"+i+"'] = '';\n";
	}
	devO(outs);
}			

function Ddppn3() {
	var sorta = [];
	for (i in Ddppn) {
		var j = Ddppn[i].split('#');
		var k = j[0].split('^');
		for (x in k) {
			var m = k[x].toLowerCase().replace(/^  */,'').replace(/  *$/,'');
			if (k[x].length > 0) {
				var l = toVel(k[x].toLowerCase().replace(/\(no\..+\)/g,'').replace(/[^ñāīūa-z]/g,''));
				sorta.push(l+'^'+m+'#'+j[1]);
			}
		}
	}
//	alert(sorta.length);
	var sorta2 = sortaz(sorta);
	var out = 'var nameda = [];\n';
	for (i in sorta2) {
		var z = sorta2[i].split('^');
		var j = z[1].split('#');
		out +="nameda['"+z[0]+"'] = ['"+j[0]+"','"+j[1]+"'];\n";
	}
	devO(out);
}	
	

function DcheckWords() {
	var nik = 'd';
	var h = 'm';
	var books = 3;
	var out = [];
	var out2 = [];
	var fc = 0;
	var sc = 0;
	
	for (i=0; i < books; i++) {		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'xml/'+nik+(i+1)+h+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		var u = xmlDoc.getElementsByTagName("h0");
		
		for (var a = 0; a < u.length; a++) // per h0
		{							
			var v = u[a].getElementsByTagName("h1");
				
			for (var b = 0; b < v.length; b++) // per h1
			{			
				var w = v[b].getElementsByTagName("h2");
			
				for (var c = 0; c < w.length; c++) // per h2
				{
					var x = w[c].getElementsByTagName("h3");
					
					for (var d = 0; d < x.length; d++) // per h3
					{
						var y = x[d].getElementsByTagName("h4");
						
						for (var e = 0; e < y.length; e++) // per h4
						{
							var z = y[e].getElementsByTagName("p");
							for (var f = 0; f < z.length; f++) // per p
							{
								var text = z[f].textContent.replace(/\^[be]b*\^/g, ' ').replace(/\^a\^[^^]*\^ea\^/g, ' ').replace(/\{[^}]*\}/g, ' ').replace(/[0-9\[\]()‘’“”`',{}?;!-]/g, ' ').replace(/\.([^nmltd])/g, "$1").replace(/"([^n])/g, "$1").replace(/ "/g, " ").replace(/   */g, ' ').toLowerCase().split(' ');
								for (zz in text) {
									outwords = [];
									var input = text[zz].replace(/\.$/g, "")
									if (input.length < 2) continue;
									fc++;
									analyzeword(input);
									if (outwords.length == 0) {
										sc++;
										if(out[input]) {
											out[input]++;
										}
										else out[input] = 1;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	for (i in out) {
		out2.push(out[i] + ' ' + i);
	}
	out2.sort();
	document.textpad.pad.value = out2.join('\n')+'\n\ntotal: '+fc+'\nnot recognized: '+sc;
}


function makeInflect() {

var n = ['','1st','2nd','3rd'];

	var x = DinfN[0];

	var out = "DinfN['"+x[0]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"']['"+x[5]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"']['"+x[5]+"']['"+(x[6] == 's' ? 0 : 1)+"'] = ['"+x[9]+"'";
	for (i = 1; i < DinfN.length; i++) {
		if(x[0] != DinfN[i][0]) out+= "];\nDinfN['"+DinfN[i][0]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[2] != DinfN[i][2]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[4] != DinfN[i][4]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[5] != DinfN[i][5]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[6] != DinfN[i][6]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
 		else {
			out+= ",'"+DinfN[i][9]+"'";
		}
		x = DinfN[i];
	}
	document.textpad.pad.value = out;
}	

function noahq() {
	
	var relmul = [];
	var relatt = [];
	var reltik = [];

	document.getElementById('mafbc').innerHTML = '<table><tr><td><textarea id="rel1"></textarea></td><td><textarea id="rel2"></textarea></td><td><textarea id="rel3"></textarea></td></tr></table>';
	var fin = '';
	var relm = [];
	var rela = [];
	var relt = [];
	for (i in relmul) {
		if(relm[relmul[i]] || relmul[i] == '') continue;
		relm[relmul[i]] = 1;
		fin += "relm['"+relmul[i]+"'] = '"+relatt[i]+'#'+reltik[i]+"';\n";
	}
	
	document.getElementById('rel1').value = fin;

	fin = '';
	for (i in relatt) {
		if(rela[relatt[i]] || relatt[i] == '') continue;
		rela[relatt[i]] = 1;
		fin += "rela['"+relatt[i]+"'] = '"+relmul[i]+'#'+reltik[i]+"';\n";
	}
	document.getElementById('rel2').value = fin;

	fin = '';
	for (i in reltik) {
		if(relt[reltik[i]] || reltik[i] == '') continue;
		relt[reltik[i]] = 1;
		fin += "relt['"+reltik[i]+"'] = '"+relmul[i]+'#'+relatt[i]+"';\n";
	}
	document.getElementById('rel3').value = fin;
}
function DcompareMAT() {
	var hi = ['m','a','t']; //,'t'
	var nik = 'y';
	var books = 14;
	var finalout = '<table><tr>';
	var out = [];
	
	for (h = 0; h < hi.length; h++) {
		out[hi[h]] = [];
		for (j=0; j < books; j++) {
			var i = j;
			if (h > 0) {
				if(j == 6 || j == 7 || j > 8) continue;
				i = abhivala[j+1];
			}
			document.textpad.pad.value = 'xml/'+nik+(j+1)+hi[h]+'.xml';
			
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open("GET", 'xml/'+nik+(j+1)+hi[h]+'.xml', false);
			xmlhttp.send(null);
			var xmlDoc = xmlhttp.responseXML.documentElement;

			var u = xmlDoc.getElementsByTagName("h0");
			
			for (var sx = 0; sx < u.length; sx++) // per h0
			{							
				name = u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ /g, '');
				if (u.length > 1 && name == '') { name = unnamed; }
				if(name && name.length > 1) {
					out[hi[h]].push(' '+name+'^'+nik+'^'+i+'^'+sx+'^0^0^0^0^1');
				}
				var v = u[sx].getElementsByTagName("h1");
					
				for (var sy = 0; sy < v.length; sy++) // per h1
				{			
					name = v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ /g, '');
					if (v.length > 1 && name == '') { name = unnamed; }
					if(name && name.length > 1) {
						out[hi[h]].push('  '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^0^0^0^2');
					}
					var w = v[sy].getElementsByTagName("h2");
				
					for (var sz = 0; sz < w.length; sz++) // per h2
					{
						name = w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ /g, '');
						if (w.length > 1 && name == '') { name = unnamed; }
						if(name && name.length > 1) {
							out[hi[h]].push('   '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^0^0^3');
						}
						var x = w[sz].getElementsByTagName("h3");
						
						for (var s = 0; s < x.length; s++) // per h3
						{
							name = x[s].getElementsByTagName("h3n")[0].textContent.replace(/ /g, '');
							if (x.length > 1 && name == '') { name = unnamed; }
							if(name && name.length > 1) {
								out[hi[h]].push('    '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^4');
							}
							var y = x[s].getElementsByTagName("h4");
							
							for (var se = 0; se < y.length; se++) // per h4
							{
								if(!y[se].getElementsByTagName("h4n")[0]) alert(h+' '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se);
								name = y[se].getElementsByTagName("h4n")[0].textContent.replace(/ /g, '');
								if (y.length > 1 && name == '') { name = unnamed; }
								if(name && name.length > 1) {
									out[hi[h]].push('     '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^5');
								}
							}
						}
					}
				}
			}
		}
		finalout += '<td><textarea  id="'+hi[h]+'"></textarea></td>';
	}
	finalout += '</tr>';
	finalout += '</table>';
	document.getElementById('mafbc').innerHTML = finalout;
	for (h = 0; h < hi.length; h++) {
			document.getElementById(hi[h]).value=out[hi[h]].join('\n');
	}
}
		
function DtitleSearchCreate() {


var xmall = [];

xmall.push('a10a');
xmall.push('a5a');
xmall.push('k12a');
xmall.push('k3a');
xmall.push('m2m');
xmall.push('s5m');
xmall.push('v6m');
xmall.push('y3m');
xmall.push('a10m');
xmall.push('a5m');
xmall.push('d1a');
xmall.push('k12m');
xmall.push('k3m');
xmall.push('m2t');
xmall.push('s5t');
xmall.push('v6t');
xmall.push('y3t');
xmall.push('a10t');
xmall.push('a5t');
xmall.push('d1m');
xmall.push('k13a');
xmall.push('k4a');
xmall.push('m3a');
xmall.push('v1a');
xmall.push('x1a');
xmall.push('y4a');
xmall.push('a11a');
xmall.push('a6a');
xmall.push('d1t');
xmall.push('k13m');
xmall.push('k4m');
xmall.push('m3m');
xmall.push('v1m');
xmall.push('x1m');
xmall.push('y4m');
xmall.push('a11m');
xmall.push('a6m');
xmall.push('d2a');
xmall.push('k14a');
xmall.push('k5a');
xmall.push('m3t');
xmall.push('v1t');
xmall.push('x2a');
xmall.push('y4t');
xmall.push('a11t');
xmall.push('a6t');
xmall.push('d2m');
xmall.push('k14m');
xmall.push('k5m');
xmall.push('s1a');
xmall.push('v2a');
xmall.push('x2m');
xmall.push('y5a');
xmall.push('a1a');
xmall.push('a7a');
xmall.push('d2t');
xmall.push('k15a');
xmall.push('k6a');
xmall.push('s1m');
xmall.push('v2m');
xmall.push('y10m');
xmall.push('y5m');
xmall.push('a1m');
xmall.push('a7m');
xmall.push('d3a');
xmall.push('k15m');
xmall.push('k6m');
xmall.push('s1t');
xmall.push('v2t');
xmall.push('y11m');
xmall.push('y5t');
xmall.push('a1t');
xmall.push('a7t');
xmall.push('d3m');
xmall.push('k16m');
xmall.push('k7a');
xmall.push('s2a');
xmall.push('v3a');
xmall.push('y12m');
xmall.push('y6a');
xmall.push('a2a');
xmall.push('a8a');
xmall.push('d3t');
xmall.push('k17m');
xmall.push('k7m');
xmall.push('s2m');
xmall.push('v3m');
xmall.push('y13m');
xmall.push('y6m');
xmall.push('a2m');
xmall.push('a8m');
xmall.push('g1m');
xmall.push('k18m');
xmall.push('k8a');
xmall.push('s2t');
xmall.push('v3t');
xmall.push('y14m');
xmall.push('y6t');
xmall.push('a2t');
xmall.push('a8t');
xmall.push('g2m');
xmall.push('k19m');
xmall.push('k8m');
xmall.push('s3a');
xmall.push('v4a');
xmall.push('y1a');
xmall.push('y9a');
xmall.push('a3a');
xmall.push('a9a');
xmall.push('g3m');
xmall.push('k1a');
xmall.push('k9a');
xmall.push('s3m');
xmall.push('v4m');
xmall.push('y1m');
xmall.push('y7m');
xmall.push('a3m');
xmall.push('a9m');
xmall.push('g4m');
xmall.push('k1m');
xmall.push('k9m');
xmall.push('s3t');
xmall.push('v4t');
xmall.push('y1t');
xmall.push('y9t');
xmall.push('a3t');
xmall.push('a9t');
xmall.push('g5m');
xmall.push('k20m');
xmall.push('m1a');
xmall.push('s4a');
xmall.push('v5a');
xmall.push('y2a');
xmall.push('y8m');
xmall.push('a4a');
xmall.push('b1m');
xmall.push('k10a');
xmall.push('k21m');
xmall.push('m1m');
xmall.push('s4m');
xmall.push('v5m');
xmall.push('y2m');
xmall.push('y9m');
xmall.push('a4m');
xmall.push('k10m');
xmall.push('k2a');
xmall.push('m1t');
xmall.push('s4t');
xmall.push('v5t');
xmall.push('y2t');
xmall.push('a4t');
xmall.push('b2m');
xmall.push('k11m');
xmall.push('k2m');
xmall.push('m2a');
xmall.push('s5a');
xmall.push('v6a');
xmall.push('y3a');

	var out = [];
	var dup = [];
	for (i in xmall) {
		var fi = xmall[i];
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'xml/'+fi+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		var name = xmlDoc.getElementsByTagName("han")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
		
		out[name] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^0^0^0^0^0^'+fi.charAt(fi.length-1)+'^0';
		
		var u = xmlDoc.getElementsByTagName("h0");
		
		var iw = fi.charAt(0);
		var ino = parseInt(fi.substring(1));		
		
		for (var sx = 0; sx < u.length; sx++) // per h0
		{							
			name = u[sx].getElementsByTagName("h0n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
			if(name && name != ' ') {
				if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^0^0^0^0^'+fi.charAt(fi.length-1)+'^1';
				else out[name] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^0^0^0^0^'+fi.charAt(fi.length-1)+'^1';
			}
			var v = u[sx].getElementsByTagName("h1");
				
			for (var sy = 0; sy < v.length; sy++) // per h1
			{			
				name = v[sy].getElementsByTagName("h1n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
				if(name && name != ' ') {
					if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^0^0^0^'+fi.charAt(fi.length-1)+'^2';
					else out[name] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^0^0^0^'+fi.charAt(fi.length-1)+'^2';
				}
				var w = v[sy].getElementsByTagName("h2");
			
				for (var sz = 0; sz < w.length; sz++) // per h2
				{
					name = w[sz].getElementsByTagName("h2n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
					if(name && name != ' ') {
						if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+fi.charAt(fi.length-1)+'^3';
						else out[name] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+fi.charAt(fi.length-1)+'^3';
					}
					var x = w[sz].getElementsByTagName("h3");
					
					for (var s = 0; s < x.length; s++) // per h3
					{
						name = x[s].getElementsByTagName("h3n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
						if(name && name != ' ') {
							if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+fi.charAt(fi.length-1)+'^4';
							else out[name] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+fi.charAt(fi.length-1)+'^4';
						}
						var y = x[s].getElementsByTagName("h4");
						
						for (var se = 0; se < y.length; se++) // per h4
						{
							name = y[se].getElementsByTagName("h4n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
							if(name && name != ' ') {
								if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+fi.charAt(fi.length-1)+'^5';
								else out[name] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+fi.charAt(fi.length-1)+'^5';
							}
						}
					}
				}
			}
		}
	}
	for (j in out) {
		dup.push(j+'#'+out[j]);
	}
	dup=sortaz(dup);

	document.textpad.pad.value="var titlelist = ['"+dup.join("',\n'") + "'];";
}

function noahsb() {
	var out = [];
	var dup = [];

var fiat = [];

for (i in filearraya) {
	fiat.push('a'+filearraya[i]);
}
for (i in filearrayt) {
	fiat.push('t'+filearrayt[i]);
}

for (i in fiat) {
	var fi = fiat[i];
	
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", 'xml/'+fi+'a.xml', false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var u = xmlDoc.getElementsByTagName("h0");
	var type = fi.charAt(0);
	var iw = fi.charAt(1);
	var ino = parseInt(fi.substring(2));		
	
	for (var sx = 0; sx < u.length; sx++) // per h0
	{							
		var v = u[sx].getElementsByTagName("h1");
			
		for (var sy = 0; sy < v.length; sy++) // per h1
		{			
			var w = v[sy].getElementsByTagName("h2");
		
			for (var sz = 0; sz < w.length; sz++) // per h2
			{
				var x = w[sz].getElementsByTagName("h3");
				
				for (var s = 0; s < x.length; s++) // per h3
				{
					var y = x[s].getElementsByTagName("h4");
					
					for (var se = 0; se < y.length; se++) // per h4
					{
						var z = y[se].getElementsByTagName("p");		

						for (var tmp = 0; tmp < z.length; tmp++) // per paragraph
						{
							var text = z[tmp].childNodes[0].nodeValue;
							var qus = text.search(/\^b\^/);
							while (qus > -1) {
								var que = text.search(/\^eb\^/);
								var term = text.substring(qus+3,que);
								term = term.replace(/^\.+pe0*[^a-zA-Z]+ */g,'').replace(/``/g,'“').replace(/''/g,'“').replace(/'/g,'’').replace(/`/g,'‘').replace(/^[^a-zA-Z\.~]*/g,'').replace(/^[^a-zA-Z]  */g,'').replace(/   */g,' ').replace(/[^a-zA-Z]*$/g,'').toLowerCase();
								if (term != '') {
									if(dup[term]) dup[term] += '#'+iw+'^'+ino+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+tmp+'^'+type;
									else dup[term] = iw+'^'+ino+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+tmp+'^'+type;
								}
								text = text.substring(que+4);
								qus = text.search(/\^b\^/);
							}
						}
					}
				}
			}
		}
	}
}
for (j in dup) {
	out.push(j+'#'+dup[j]);
}
out=sortaz(out);

document.textpad.pad.value="attlist.push('"+out.join("');\nattlist.push('") + "');";
}

/*
            var file = 'xml/listam.xml';
            
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", file, false);
            xmlhttp.send(null);
            var xmlDoc = xmlhttp.responseXML.documentElement;
            var w = xmlDoc.getElementsByTagName('ab');
            
            var out = 'var amlist = [];\n';
            var countv = -1;
            var countc = 0;
            
            for (a = 0; a < w.length; a++) {
				out+='amlist['+a+'] = [];\n';
				var x = w[a].getElementsByTagName('av');
				for(b = 0; b < x.length; b++) {
					out+='amlist['+a+']['+b+'] = [];\n';
					countc = 0;
					var y = x[b].getElementsByTagName('as');
					for(c = 0; c < y.length; c++) {
						out+='amlist['+a+']['+b+']['+c+'] = [];\n';
						var z = y[c].getElementsByTagName('ac');
						for(d = 0; d < z.length; d++) {
							out+='amlist['+a+']['+b+']['+c+']['+d+'] = [];\n';
							var zz = z[d].getElementsByTagName('ap');
							for(e = 0; e < zz.length; e++) {
								out+='amlist['+a+']['+b+']['+c+']['+d+']['+e+'] = '+zz[e].childNodes[0].nodeValue+';\n';
							}
						}
					}
				}
			}
document.textpad.pad.value = out;						
*/
function makeSin() {
	var vowel = ['a','ā','i','ī','u','ū','e','o'];
	var cons = ['ā','i','ī','u','ū','e','o','ṃ','k','kh','g','gh','ṅ','c','ch','j','jh','ñ','ṭ','ṭh','ḍ','ḍh','ṇ','t','th','d','dh','n','p','ph','b','bh','m','y','r','l','ḷ','v','s','h'];

	var sinV = ['අ','ආ','ඉ','ඊ','උ','ඌ','එ','ඔ']

	var sinC = ['ා','ි','ී','ු','ූ','ෙ','ො','ං','ක','ඛ','ග','ඝ','ඞ','ච','ඡ','ජ','ඣ','ඤ','ට','ඨ','ඩ','ඪ','ණ','ත','ථ','ද','ධ','න','ප','ඵ','බ','භ','ම','ය','ර','ල','ළ','ව','ස','හ']


	var padOut = '';

	for(i in sinV) {
	padOut += "vowel['"+vowel[i] + "'] = '" + sinV[i] + "';\n";
	}
	document.textpad.pad.value = padOut;
}

function getWordList(){
	
	var dataout = [];
	
	for (i = 0; i < 4; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML1/'+i+'/ped.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var allp = xmlDoc.getElementsByTagName('data');
		
		for (j =0; j < allp.length; j++) {
			var alld = allp[j].textContent.replace(/<[^>]*>/g, '').replace(/   */g, ' ').split(' ');
			
			var thisterms = [];
			
			for (k = 0; k < alld.length; k++) {
				var thisd = 'XYZ'+alld[k].replace(/[0-9\/\+\%";.\-\&\*!,)(:<=>?\[\]_˚ɔ≈\\]+/g, '').replace(/'$/g, '').replace(/^[~']/g, '').toLowerCase();
				if (thisd.length < 7) continue;
				if(thisterms[thisd]) continue;
				thisterms[thisd] = 1;
				if(dataout[thisd]) {
					dataout[thisd] += '#' + i + '^' + j;
				}
				else dataout[thisd] = i + '^' + j;
			}
		}
	}
	var outputD = [];
	for (l in dataout) {
		outputD.push(l.substring(3) + '#' + dataout[l]); 
	}
	outputD = outputD.sort();
	writeFile('devTest',"var pedFull = [];\npedFull.push('"+outputD.join("');\npedFull.push('") + "');", 'UTF-8');

}


function noah11()
{
	var dataout = '';
	for (i = 0; i <= 4; i++) {
	
		var pedp = 'etc/XML1/'+ i +'/ped.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", pedp, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var cntx = xmlDoc.getElementsByTagName('data').length;
		var noc = ''; 
		var nocd = 'x';
		var nocdo;
		for (e = 0; e < cntx; e++) {
			noc = i+'/'+e;
			if ( noahda[noc]) {
				if ( noahda[noc].charAt(0) != nocd.charAt(0)) { dataout += '<h1>' + noahda[noc].charAt(0) + '</h1>\n'; }
				nocd = noahda[noc];
				var dataa = xmlDoc.getElementsByTagName('data')[e].getElementsByTagName('sdata');
				var data = '';
				for (j=0; j<dataa.length; j++) {
					data += dataa[j].textContent;
				}
				nocdo = nocd.replace(/aa/g, 'ā');
				nocdo = nocdo.replace(/ii/g, 'ī');
				nocdo = nocdo.replace(/uu/g, 'ū');
				nocdo = nocdo.replace(/,t/g, 'ṭ');
				nocdo = nocdo.replace(/,d/g, 'ḍ');
				nocdo = nocdo.replace(/`n/g, 'ṅ');
				nocdo = nocdo.replace(/,n/g, 'ṇ');
				nocdo = nocdo.replace(/,m/g, 'ṃ');
				nocdo = nocdo.replace(/\~n/g, 'ñ');
				nocdo = nocdo.replace(/,l/g, 'ḷ');				
				nocdo = nocdo.replace(/`/g, '-');
				nocdo = nocdo.replace(/z/g, ' ');
				dataout	+= '<h2>' + nocdo + '</h2>\n<p>' + data + '\n';
			}
		}
	}
	
	writeFile('PEDdata.html', dataout, 'UTF-8')
}

function noah22()
{
	var dataout = '';
	for (i = 1; i <= 8; i++) {
	
		var dn = 'etc/XML2/'+ i +'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dn, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var en = xmlDoc.getElementsByTagName('entry');
		for (j = 0; j < en.length; j++) { 
			var out = '';
			var da = en[j].getElementsByTagName('data');
			for (k = 0; k < da.length; k++) {
				if(da[k].childNodes[0]) {
					var data = da[k].textContent;
					out += data;
				}
			}
			writeFile(i+'.'+j+'.html', out, 'UTF-8')
		}
		out = out.replace(/\&lt;/g, '\n<');
		out = out.replace(/\&gt;/g, '>');
	}
}


function noahddd() {
//	alert('yes');
	var out = '';
	var x=0;
	for (i = 0; i< devmain.length; i++) {
		if (devmain[i+1] && devmain[i][0] == devmain[i+1][0]) {
			x++;
			out+='mainda["'+devmain[i][0]+'z'+x+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			//alert(devmain[i]);
		}
		else {
			if(x >0) out+='mainda["'+devmain[i][0]+'z'+(x+1)+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			else out+='mainda["'+devmain[i][0]+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			x=0;
		}
	}
	document.textpad.pad.value = out;
}
		

function noahd() {
	var engN = sortaz(newE);
	out = '';
	for (i in engN) {
		var x = engN[i].split(',');
		out += 'yt['+toVel(x.shift()).replace(/"n/g, '`n').replace(/\./g, ',')+'] = ['+x.join(',')+'];\n';
	}
	writeFile('english1.js', out);
}



function Dloaded() {

	var x = [];

	for (i in nameda) {
		x.push(i.replace(/`n/g, '"n').replace(/,/g, '.').replace("f", "!")+'#'+nameda[i]);
	}
	var y = sortaz(x);
			
	document.getElementById('pad').innerHTML = y.join('\n');
}

function DloadFileAsXML() {
	var cont = readExtFile('Desktop/ati_website/html/tipitaka/dn','dn.01.0.bodh.html');
	document.textpad.pad.value = cont;
	var parser=new DOMParser();
	var doc = parser.parseFromString(cont,'text/xml');
	alert(doc.documentElement.getElementsByTagName('div').length);
}

function Dnda() {
	var out = '';
	var na = [];
	for (i in nameda) {
		var s = nameda[i].split('#');
		var f = 1;
		while(na[s[0]+'f'+f]) { f++; }
		na[s[0]+'f' + f] = s[1];
	}
	for (j in na) {
		out += "nameda['"+j+"'] = '"+na[j]+"';"; 
	}
	document.getElementById('pad').innerHTML = out + '];';
}

function DnameDa () {

	var oldda = [];
	var longda = [];
	var newda = [];
	var noneda = [];
	
	for (i in nameda) {
		var s = nameda[i].split('/');
		var t = toUni(i.split('f')[0]);
		var u = t.charAt(t.length-1);
		
		var n = new RegExp(t,'i');
		
		
		var o = new RegExp(t+u,'i');

		var dppnf = 'etc/XML2/'+s[0]+'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dppnf, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var data = xmlDoc.getElementsByTagName('entry')[parseInt(s[1])].textContent.match(/\&lt;h2\&gt;[^&]*&lt;\/h2\&gt;/);
		if(data) data = data[0].replace(/\&lt;\/*h2\&gt;/g,'');
		else {
			noneda.push(i+' // ' + nameda[i]);
			continue;
		}
		if(n.exec(data)) {
			oldda.push(t);
		}
		else if(o.exec(data)) {
			longda.push(t+u);
		}
		else if(data) {
			newda.push(data);
		}
		else {
			noneda.push(i+' // ' + nameda[i]);
		}
		
		devO('\n// old\n'+oldda.join('\n')+'\n// long\n'+longda.join('\n')+'\n// new\n'+newda.join('\n')+'\n// none\n'+noneda.join('\n'));
	}
}

function DnameDa2 () {

	var oldda = [];
	var longda = [];
	var newda = [];
	var noneda = [];
	
	for (i = 1; i < 10; i++) {

		var dppnf = 'etc/XML2/'+i+'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dppnf, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var dataa = xmlDoc.getElementsByTagName('entry');
		
		for (j = 0; j < dataa.length; j++) {
			
			var data = dataa[j].textContent.replace(/huge"\]/);
			if(data) data = data[0].replace(/\&lt;\/*h2\&gt;/g,'');
			else {
				noneda.push(i+' // ' + nameda[i]);
				continue;
			}
			if(n.exec(data)) {
				oldda.push(t);
			}
			else if(o.exec(data)) {
				longda.push(t+u);
			}
			else if(data) {
				newda.push(data);
			}
			else {
				noneda.push(i+' // ' + nameda[i]);
			}
		}
	}
	devO('\n// old\n'+oldda.join('\n')+'\n// long\n'+longda.join('\n')+'\n// new\n'+newda.join('\n')+'\n// none\n'+noneda.join('\n'));
}


function DdppnNameNo() {

	var out = '';
	var t=0;
	for (i in nameno) {
		t=0;
		for (j in nn) {
			if (nn[j].search(nameno[i]+'/') == 0) {
				out += "nameno['"+i+"'] = '"+nn[j]+"';\n";
				t=1;
				break;
			}
		}
		if(t == 0) { out += "nameno['"+i+"'] = '"+nameno[i]+"';\n"; }
	}
	document.getElementById('pad').innerHTML = out;
}



function Ddppnsearchstart(getstring)
{
	moveframey('dif');
	moveframex(3);

	document.getElementById('difb').innerHTML='';
	document.getElementById('difb').appendChild(pleasewait);

	
	if(document.form.sofulltext.checked) { // full text search
		
		dppnFullTextSearch(getstring);
		return;
	}

	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}

	var gslength = getstring.length;
	var gsplit = new Array();	
	
	var gletter = getstring.charAt(0);

	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var dict = '../DPPN/';
	
	var finouta = new Array();
	var finout = '<table>';

	if (dppn.length == 0) { for (a in nameda) { dppn.push([a,nameda[a]]); } }

    for (x in dppn)
	{
		var dppnt = dppn[x][0];
		
		if(document.form.sofuzzy.checked) {
			dppnt = toFuzzy(dppnt);
		}

		var yessir = (dppnt.search(getstring) > -1);
		if(yessir && dppnt.search(/[tdnl]/) > -1)
		{
			var loc = dppn[x][1];
			
			
			var dppntb = dppnt.replace(/([tdnl])/g, ".$1").replace(/([.~"])\./g, "$1").replace(/su\.t\.ta$/, "sutta").replace(/jaa\.taka$/, "jaataka");
			var dppntc = '';
			for (y = 0; y < dppntb.length; y++) {
				var th = dppntb[y];
				if (/[."~]/.exec(th)) {
					th += dppntb[++y];
				}
				if(/[tdnl]/.exec(th) && !/["~]/.exec(th)) dppntc += '<a href="javascript:void(0)" onclick="if(this.innerHTML.charAt(0) != \'.\') this.innerHTML = \'.\'+this.innerHTML; else this.innerHTML=this.innerHTML.substring(1)">'+th+'</a>';
				else dppntc += th;
			}
			
			finout += '<tr id="DevX'+dppnt.replace(/"/g,'x')+'"><td><a class="tiny" href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onClick="DdppnShow(\'dppn/' + loc + ',' + dppnt + '\')">'+dppnt+'</a></td><td id="DevD'+dppnt.replace(/"/g,'x')+'">' + dppntc + '</td><td><input type="button" value="save" onClick="DdppnSave(\''+dppnt.replace(/"/g,'x')+'\')"></td></tr>';
			
			// <input type="input" id="DevD'+dppnt.replace(/"/g,'x')+'" value="'+dppnt.replace(/([tdnl])/g, ".$1").replace(/([.~"])\./g, "$1").replace(/su\.t\.ta$/, "sutta").replace(/jaa\.taka$/, "jaataka").replace(/"/g,'&quot;')+'"> <input type="checkbox" onclick="DdppnReplace(\'t\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="checkbox" onclick="DdppnReplace(\'d\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="checkbox" onclick="DdppnReplace(\'n\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="checkbox" onclick="DdppnReplace(\'l\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="button" value="save" onClick="DdppnSave(\''+dppnt.replace(/"/g,'x')+'\')"></div>';
		}
	}
	finout += '</table>';

	
	var outDiv = document.createElement('div');
	outDiv.setAttribute('align','right');
	outDiv.innerHTML = finout;
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}

function DdppnReplace(ltr, id, ck) {
	var val = document.getElementById(id).value;
	if(ck) {
		var rx = new RegExp(ltr,'g');
		document.getElementById(id).value = val.replace(rx, '.'+ltr);
	}
	else {
		var rx = new RegExp('\\.'+ltr,'g');
		document.getElementById(id).value = val.replace(rx, ltr);
	}
}
function DdppnSave(terma) {
	var term = terma.replace(/x/g,'"')
	var termn = document.getElementById('DevD'+terma).innerHTML.replace(/<[^>]*>/g, '');
	nameda[termn] = nameda[term];
	delete nameda[term];
	var sorta = [];
	for (i in nameda) {
		sorta.push(i+'#'+nameda[i]);
	}
	var sorta2 = sortaz(sorta);
	var outs = 'var nameda = [];\n\n';
	for (i in sorta2) {
		var sa = sorta2[i].split('#');
		outs+= 'nameda[\''+sa[0]+'\'] = '+sa[1]+';\n';
	}
	document.getElementById('DevX'+terma).style.display = 'none';
	devO(outs);
}

function DdppnShow(file,which) {
	var filea = file.split(',');
	var tloc = filea[0].split('/');
	if (nameno[tloc[2]+','+filea[1]]) { // fudge
		if (nameno[tloc[2]+','+filea[1]] == '') {
			alert('Link not found');
			return;
		}
		var ttmp = nameda[nameno[tloc[2]+','+filea[1]]][1].split('/');
		tloc[0] = 'dppn';
		tloc[1] = ttmp[0];
		tloc[2] = ttmp[1];
		
	}
	
	if(!which) { // not from select
		var dppnhistt = [];
		dppnhist = dppnhist.slice(0,dhmark+1); // cut old future
		for (i in dppnhist) {
			if (dppnhist[i] != file) { dppnhistt.push(dppnhist[i]); }
		}
		dppnhist = dppnhistt.concat([file]); // add latest 
		dhmark = dppnhist.length; // set mark to latest
	}
	
	

	
	// xml
	
	var dppnf = 'etc/XML2/'+tloc[1]+'.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", dppnf, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var data = ' ' + xmlDoc.getElementsByTagName('entry')[tloc[2]].textContent.replace(/\[/g, '<').replace(/\]/g, '>').replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');
	window.alert(file+' | ' +data);
}
