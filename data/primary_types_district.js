var primary_types_district = [
 {
   "file_name": "DATA-DISTRICT-ARSON.json",
   "name": "Arson",
   "selector": "DATA-DISTRICT-ARSON"
 },
 {
   "file_name": "DATA-DISTRICT-ASSAULT.json",
   "name": "assault",
   "selector": "DATA-DISTRICT-ASSAULT"
 },
 {
   "file_name": "DATA-DISTRICT-BATTERY.json",
   "name": "battery",
   "selector": "DATA-DISTRICT-BATTERY"
 },
 {
   "file_name": "DATA-DISTRICT-BURGLARY.json",
   "name": "burglary",
   "selector": "DATA-DISTRICT-BURGLARY"
 },
 {
   "file_name": "DATA-DISTRICT-CONCEALED-CARRY-LICENSE-VIOLATION.json",
   "name": "concealed Carry License Violation",
   "selector": "DATA-DISTRICT-CONCEALED-CARRY-LICENSE-VIOLATION"
 },
 {
   "file_name": "DATA-DISTRICT-CRIM-SEXUAL-ASSAULT.json",
   "name": "crim Sexual Assault",
   "selector": "DATA-DISTRICT-CRIM-SEXUAL-ASSAULT"
 },
 {
   "file_name": "DATA-DISTRICT-CRIMINAL-DAMAGE.json",
   "name": "criminal Damage",
   "selector": "DATA-DISTRICT-CRIMINAL-DAMAGE"
 },
 {
   "file_name": "DATA-DISTRICT-CRIMINAL-TRESPASS.json",
   "name": "criminal Trespass",
   "selector": "DATA-DISTRICT-CRIMINAL-TRESPASS"
 },
 {
   "file_name": "DATA-DISTRICT-DECEPTIVE-PRACTICE.json",
   "name": "deceptive Practice",
   "selector": "DATA-DISTRICT-DECEPTIVE-PRACTICE"
 },
 {
   "file_name": "DATA-DISTRICT-GAMBLING.json",
   "name": "gambling",
   "selector": "DATA-DISTRICT-GAMBLING"
 },
 {
   "file_name": "DATA-DISTRICT-HOMICIDE.json",
   "name": "homicide",
   "selector": "DATA-DISTRICT-HOMICIDE"
 },
 {
   "file_name": "DATA-DISTRICT-HUMAN-TRAFFICKING.json",
   "name": "human Trafficking",
   "selector": "DATA-DISTRICT-HUMAN-TRAFFICKING"
 },
 {
   "file_name": "DATA-DISTRICT-INTERFERENCE-WITH-PUBLIC-OFFICER.json",
   "name": "interference With Public Officer",
   "selector": "DATA-DISTRICT-INTERFERENCE-WITH-PUBLIC-OFFICER"
 },
 {
   "file_name": "DATA-DISTRICT-INTIMIDATION.json",
   "name": "intimidation",
   "selector": "DATA-DISTRICT-INTIMIDATION"
 },
 {
   "file_name": "DATA-DISTRICT-KIDNAPPING.json",
   "name": "kidnapping",
   "selector": "DATA-DISTRICT-KIDNAPPING"
 },
 {
   "file_name": "DATA-DISTRICT-LIQUOR-LAW-VIOLATION.json",
   "name": "liquor Law Violation",
   "selector": "DATA-DISTRICT-LIQUOR-LAW-VIOLATION"
 },
 {
   "file_name": "DATA-DISTRICT-MOTOR-VEHICLE-THEFT.json",
   "name": "motor Vehicle Theft",
   "selector": "DATA-DISTRICT-MOTOR-VEHICLE-THEFT"
 },
 {
   "file_name": "DATA-DISTRICT-NARCOTICS.json",
   "name": "narcotics",
   "selector": "DATA-DISTRICT-NARCOTICS"
 },
 {
   "file_name": "DATA-DISTRICT-NON-CRIMINAL.json",
   "name": "non Criminal",
   "selector": "DATA-DISTRICT-NON-CRIMINAL"
 },
 {
   "file_name": "DATA-DISTRICT-OBSCENITY.json",
   "name": "obscenity",
   "selector": "DATA-DISTRICT-OBSCENITY"
 },
 {
   "file_name": "DATA-DISTRICT-OFFENSE-INVOLVING-CHILDREN.json",
   "name": "offense Involving Children",
   "selector": "DATA-DISTRICT-OFFENSE-INVOLVING-CHILDREN"
 },
 {
   "file_name": "DATA-DISTRICT-OTHER-NARCOTIC-VIOLATION.json",
   "name": "other Narcotic Violation",
   "selector": "DATA-DISTRICT-OTHER-NARCOTIC-VIOLATION"
 },
 {
   "file_name": "DATA-DISTRICT-OTHER-OFFENSE.json",
   "name": "other Offense",
   "selector": "DATA-DISTRICT-OTHER-OFFENSE"
 },
 {
   "file_name": "DATA-DISTRICT-PROSTITUTION.json",
   "name": "prostitution",
   "selector": "DATA-DISTRICT-PROSTITUTION"
 },
 {
   "file_name": "DATA-DISTRICT-PUBLIC-INDECENCY.json",
   "name": "public Indecency",
   "selector": "DATA-DISTRICT-PUBLIC-INDECENCY"
 },
 {
   "file_name": "DATA-DISTRICT-PUBLIC-PEACE-VIOLATION.json",
   "name": "public Peace Violation",
   "selector": "DATA-DISTRICT-PUBLIC-PEACE-VIOLATION"
 },
 {
   "file_name": "DATA-DISTRICT-ROBBERY.json",
   "name": "robbery",
   "selector": "DATA-DISTRICT-ROBBERY"
 },
 {
   "file_name": "DATA-DISTRICT-SEX-OFFENSE.json",
   "name": "sex Offense",
   "selector": "DATA-DISTRICT-SEX-OFFENSE"
 },
 {
   "file_name": "DATA-DISTRICT-STALKING.json",
   "name": "stalking",
   "selector": "DATA-DISTRICT-STALKING"
 },
 {
   "file_name": "DATA-DISTRICT-THEFT.json",
   "name": "theft",
   "selector": "DATA-DISTRICT-THEFT"
 },
 {
   "file_name": "DATA-DISTRICT-WEAPONS-VIOLATION.json",
   "name": "weapons Violation",
   "selector": "DATA-DISTRICT-WEAPONS-VIOLATION"
 }
];

var primaryCrimeDatabase = {};

for (var counter = 0; counter < primary_types_district.length; counter++) {
   primaryCrimeDatabase[primary_types_district[counter]["selector"]] = {
      "name": primary_types_district[counter]["name"],
      "file_name": `primary_district/${primary_types_district[counter]["file_name"]}`
   };
}

exports.primary_types = primaryCrimeDatabase;