var primary_types = [
 {
   "file_name": "data_arson.json",
   "name": "Arson",
   "selector": "data_arson"
 },
 {
   "file_name": "data_assault.json",
   "name": "Assault",
   "selector": "data_assault"
 },
 {
   "file_name": "data_battery.json",
   "name": "Battery",
   "selector": "data_battery"
 },
 {
   "file_name": "data_burglary.json",
   "name": "Burglary",
   "selector": "data_burglary"
 },
 {
   "file_name": "data_concealed_carry_license_violation.json",
   "name": "Concealed Carry License Violation",
   "selector": "data_concealed_carry_license_violation"
 },
 {
   "file_name": "data_crim_sexual_assault.json",
   "name": "Criminal Sexual Assault",
   "selector": "data_crim_sexual_assault"
 },
 {
   "file_name": "data_criminal_damage.json",
   "name": "Criminal Damage",
   "selector": "data_criminal_damage"
 },
 {
   "file_name": "data_criminal_trespass.json",
   "name": "Criminal Trespass",
   "selector": "data_criminal_trespass"
 },
 {
   "file_name": "data_deceptive_practice.json",
   "name": "Deceptive Practice",
   "selector": "data_deceptive_practice"
 },
 {
   "file_name": "data_gambling.json",
   "name": "Gambling",
   "selector": "data_gambling"
 },
 {
   "file_name": "data_homicide.json",
   "name": "Homicide",
   "selector": "data_homicide"
 },
 {
   "file_name": "data_human_trafficking.json",
   "name": "Human Trafficking",
   "selector": "data_human_trafficking"
 },
 {
   "file_name": "data_interference_with_public_officer.json",
   "name": "Interference with Public Officer",
   "selector": "data_interference_with_public_officer"
 },
 {
   "file_name": "data_intimidation.json",
   "name": "Intimidation",
   "selector": "data_intimidation"
 },
 {
   "file_name": "data_kidnapping.json",
   "name": "Kidnapping",
   "selector": "data_kidnapping"
 },
 {
   "file_name": "data_liquor_law_violation.json",
   "name": "Liquour Law Violation",
   "selector": "data_liquor_law_violation"
 },
 {
   "file_name": "data_motor_vehicle_theft.json",
   "name": "Motor Vehicle Theft",
   "selector": "data_motor_vehicle_theft"
 },
 {
   "file_name": "data_narcotics.json",
   "name": "Narcotics",
   "selector": "data_narcotics"
 },
 {
   "file_name": "data_non_criminal.json",
   "name": "Non-criminal",
   "selector": "data_non_criminal"
 },
 {
   "file_name": "data_obscenity.json",
   "name": "Obscenity",
   "selector": "data_obscenity"
 },
 {
   "file_name": "data_offense_involving_children.json",
   "name": "Offence involving children",
   "selector": "data_offense_involving_children"
 },
 {
   "file_name": "data_other_narcotic_violation.json",
   "name": "Other narcotic violation",
   "selector": "data_other_narcotic_violation"
 },
 {
   "file_name": "data_other_offense.json",
   "name": "Other offence",
   "selector": "data_other_offense"
 },
 {
   "file_name": "data_prostitution.json",
   "name": "Prostitution",
   "selector": "data_prostitution"
 },
 {
   "file_name": "data_public_indecency.json",
   "name": "Public Indecency",
   "selector": "data_public_indecency"
 },
 {
   "file_name": "data_public_peace_violation.json",
   "name": "Public Peace Violation",
   "selector": "data_public_peace_violation"
 },
 {
   "file_name": "data_robbery.json",
   "name": "Robbery",
   "selector": "data_robbery"
 },
 {
   "file_name": "data_sex_offense.json",
   "name": "Sex Offence",
   "selector": "data_sex_offense"
 },
 {
   "file_name": "data_stalking.json",
   "name": "Stalking",
   "selector": "data_stalking"
 },
 {
   "file_name": "data_theft.json",
   "name": "Theft",
   "selector": "data_theft"
 },
 {
   "file_name": "data_weapons_violation.json",
   "name": "Weapons Violation",
   "selector": "data_weapons_violation"
 }
];

var primaryCrimeDatabase = {};

for (var counter = 0; counter < primary_types.length; counter++) {
   primaryCrimeDatabase[primary_types[counter]["selector"]] = {
      "name": primary_types[counter]["name"],
      "file_name": `primary/${primary_types[counter]["file_name"]}`
   };
}

exports.primary_types = primaryCrimeDatabase;