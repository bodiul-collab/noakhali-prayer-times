export interface SeoCity {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  intro: string;
  nearbySlugs: string[];
  prominentMosques: string[];
  halalHubs: string[];
  metaDescription: string;
  banglaTitle: string;
}

export const SEO_CITIES: Record<string, SeoCity> = {
  'houston-tx': {
    slug: 'houston-tx',
    name: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 29.7604,
    longitude: -95.3698,
    timeZone: 'America/Chicago',
    intro:
      'Home to one of the largest and most vibrant Bangladeshi and Muslim diaspora communities in the southern United States. Families throughout the Greater Houston metroplex—from the bustling culinary hub of Hillcroft and Sugar Land to Katy and Spring—gather daily for prayer and community life. Major regional institutions including the Islamic Society of Greater Houston (ISGH) network and River Oaks Islamic Center provide steady congregation times.',
    nearbySlugs: ['dallas-tx', 'sugar-land-tx', 'austin-tx', 'san-antonio-tx'],
    prominentMosques: [
      'ISGH Main Center (Al-Noor Masjid)',
      'River Oaks Islamic Center (ROIC)',
      'Masjid Maryam (Sugar Land / Southwest)',
      'Brand Lane Islamic Center',
    ],
    halalHubs: [
      'Hillcroft Mahatma Gandhi District (Bangla & Deshi restaurants)',
      'Sugar Land Highway 6 halal corridor',
      'Harwin Drive halal meat markets',
    ],
    metaDescription:
      'Accurate Muslim prayer times in Houston, TX today with live next prayer countdown, Qibla compass, Hanafi/ISNA options, and traditional meal ideas.',
    banglaTitle: 'হিউস্টন, টেক্সাস নামাজের সময়সূচী',
  },

  'dallas-tx': {
    slug: 'dallas-tx',
    name: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 32.7767,
    longitude: -96.797,
    timeZone: 'America/Chicago',
    intro:
      'Dallas-Fort Worth hosts a rapidly growing Muslim community spanning Irving, Plano, Richardson, and Carrollton with dozens of active masajid and halal dining avenues. Prominent centers like the East Plano Islamic Center (EPIC), Valley Ranch Islamic Center (VRIC), and Dallas Central Mosque bring thousands together for Friday Jumu’ah and Ramadan iftars. Most local Bangladeshi masajid observe the Hanafi Asr standard alongside ISNA calculations.',
    nearbySlugs: ['houston-tx', 'irving-tx', 'plano-tx', 'arlington-tx', 'austin-tx'],
    prominentMosques: [
      'East Plano Islamic Center (EPIC)',
      'Valley Ranch Islamic Center (VRIC)',
      'Dallas Central Mosque (ISNT)',
      'Islamic Association of North Texas (IANT)',
    ],
    halalHubs: [
      'Belt Line Road in Irving (Deshi & Bangladeshi eateries)',
      'Plano Spring Creek halal corridor',
      'Richardson Chinatown & Middle Eastern markets',
    ],
    metaDescription:
      'Check today’s prayer times in Dallas, TX with live countdown to next salah, Qibla direction, Hanafi Asr timings, and Bangladeshi recipe suggestions.',
    banglaTitle: 'ডালাস, টেক্সাস নামাজের সময়সূচী',
  },

  'new-york-ny': {
    slug: 'new-york-ny',
    name: 'New York City',
    state: 'New York',
    stateCode: 'NY',
    country: 'United States',
    countryCode: 'US',
    latitude: 40.7128,
    longitude: -74.006,
    timeZone: 'America/New_York',
    intro:
      'New York City is the cultural and culinary heart of the North American Bangladeshi diaspora, anchored by dense communities across Jackson Heights, Jamaica, Astoria, Kensington, and Parkchester. Historic institutions including the Islamic Cultural Center of New York (ICCNY), Jamaica Muslim Center, and Parkchester Jame Masjid echo the adhan across the five boroughs. With swift seasonal daylight shifts between summer and winter, tracking accurate prayer times is essential for busy commuters and families.',
    nearbySlugs: ['jersey-city-nj', 'paterson-nj', 'philadelphia-pa', 'boston-ma'],
    prominentMosques: [
      'Jamaica Muslim Center (JMC, Queens)',
      'Parkchester Jame Masjid (Bronx)',
      'Islamic Cultural Center of New York (ICCNY, Manhattan 96th St)',
      'Baitul Jannah Jame Masjid (Kensington, Brooklyn)',
    ],
    halalHubs: [
      '73rd Street & 37th Ave in Jackson Heights',
      'Hillside Avenue in Jamaica, Queens',
      'Church Avenue in Kensington, Brooklyn',
      'Starling Ave & Westchester in Parkchester',
    ],
    metaDescription:
      'Daily Muslim prayer times for New York City (Queens, Brooklyn, Bronx, Manhattan). Live countdown to next prayer, Qibla compass, and Ramadan schedule.',
    banglaTitle: 'নিউ ইয়র্ক সিটি নামাজের সময়সূচী',
  },

  'jersey-city-nj': {
    slug: 'jersey-city-nj',
    name: 'Jersey City',
    state: 'New Jersey',
    stateCode: 'NJ',
    country: 'United States',
    countryCode: 'US',
    latitude: 40.7178,
    longitude: -74.0431,
    timeZone: 'America/New_York',
    intro:
      'Situated just across the Hudson River from Lower Manhattan, Jersey City features a dense and historic Muslim and Bangladeshi community centred along Newark Avenue and Journal Square. Respected institutions like Masjid Al-Salam and the Islamic Center of Jersey City provide regular daily congregational prayers and weekend Quranic schools. Proximity to transit corridors makes on-the-go offline prayer alerts especially practical for commuters.',
    nearbySlugs: ['new-york-ny', 'paterson-nj', 'newark-nj', 'philadelphia-pa'],
    prominentMosques: [
      'Masjid Al-Salam (Islamic Society of Badr)',
      'Islamic Center of Jersey City (ICJC)',
      'Masjid Al-Huda (Newark Ave)',
      'Muslim Federation of New Jersey',
    ],
    halalHubs: [
      'Newark Avenue India Square & Bengali food stalls',
      'West Side Avenue halal groceries',
      'Journal Square Middle Eastern and deshi restaurants',
    ],
    metaDescription:
      'Accurate daily prayer times for Jersey City, NJ. Includes live countdown, Qibla compass, Hanafi/ISNA options, and Bangladeshi meal suggestions.',
    banglaTitle: 'জার্সি সিটি, নিউ জার্সি নামাজের সময়সূচী',
  },

  'washington-dc': {
    slug: 'washington-dc',
    name: 'Washington',
    state: 'District of Columbia',
    stateCode: 'DC',
    country: 'United States',
    countryCode: 'US',
    latitude: 38.9072,
    longitude: -77.0369,
    timeZone: 'America/New_York',
    intro:
      'The nation’s capital and surrounding DMV metro area (including Northern Virginia and Montgomery County, MD) feature a distinguished and diverse Muslim community spanning diplomats, professionals, and long-standing families. Landmark institutions such as the Islamic Center of Washington on Embassy Row and nearby Dar Al-Hijrah host multi-ethnic congregations. Local Bangladeshi associations frequently gather for community dinners and seasonal Ramadan taraweeh prayers across the district.',
    nearbySlugs: ['alexandria-va', 'silver-spring-md', 'baltimore-md', 'philadelphia-pa'],
    prominentMosques: [
      'The Islamic Center of Washington (Embassy Row)',
      'Masjid Muhammad (The Nation’s Mosque)',
      'Dar Al-Hijrah Islamic Center (Falls Church)',
      'ADAMS Center (Sterling / DMV)',
    ],
    halalHubs: [
      'U Street and Adams Morgan halal dining',
      'Silver Spring & Wheaton deshi supermarkets',
      'Falls Church & Annandale Kabob avenues',
    ],
    metaDescription:
      'Today’s prayer times in Washington, DC with live next prayer countdown, accurate Qibla degree compass, and sunset/iftar calculation.',
    banglaTitle: 'ওয়াশিংটন ডিসি নামাজের সময়সূচী',
  },

  'detroit-mi': {
    slug: 'detroit-mi',
    name: 'Detroit / Dearborn',
    state: 'Michigan',
    stateCode: 'MI',
    country: 'United States',
    countryCode: 'US',
    latitude: 42.3314,
    longitude: -83.0458,
    timeZone: 'America/Detroit',
    intro:
      'Greater Detroit and neighboring Dearborn and Hamtramck represent historic milestones for American Muslim civic life, being home to the historic Islamic Center of America and the nation’s first Muslim-majority city council in Hamtramck. The vibrant Bangladeshi enclave along Conant Avenue features bustling deshi groceries, tea stalls, and active masajid including Al-Falah Jame Masjid and Dar Al-Arqam. Due to Michigan’s northern latitude, high-latitude calculation rules ensure consistent Fajr and Isha schedules during long midsummer days.',
    nearbySlugs: ['hamtramck-mi', 'warren-mi', 'chicago-il', 'columbus-oh'],
    prominentMosques: [
      'Al-Falah Jame Masjid (Hamtramck / Detroit)',
      'Islamic Center of America (Dearborn)',
      'Masjid Mu’ath Bin Jabal',
      'Baitul Mukarram Masjid (Warren)',
    ],
    halalHubs: [
      'Conant Avenue (Hamtramck Bangla Town)',
      'Warren Avenue (Dearborn Arab & Halal corridor)',
      'Ryan Road deshi grocery & fish markets',
    ],
    metaDescription:
      'Prayer times for Detroit & Dearborn, Michigan. High-latitude twilight rule supported, live next prayer countdown, and Qibla direction.',
    banglaTitle: 'ডেট্রয়েট ও ডিয়ারবর্ন নামাজের সময়সূচী',
  },

  'chicago-il': {
    slug: 'chicago-il',
    name: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    country: 'United States',
    countryCode: 'US',
    latitude: 41.8781,
    longitude: -87.6298,
    timeZone: 'America/Chicago',
    intro:
      'Chicago’s historic South Asian and Bangladeshi heart on Devon Avenue in West Ridge has welcomed generations of immigrant families with legendary halal eateries, grocery bazaars, and community centers. Architectural landmarks like the Downtown Islamic Center and the Muslim Community Center (MCC) on Elston Avenue offer full daily services. Midwest seasonal temperature swings make reliable on-device prayer calculations indispensable for lakefront residents.',
    nearbySlugs: ['detroit-mi', 'minneapolis-mn', 'milwaukee-wi', 'indianapolis-in'],
    prominentMosques: [
      'Muslim Community Center (MCC Chicago)',
      'Downtown Islamic Center (Loop)',
      'Masjid Al-Mustafa (Devon Ave)',
      'Islamic Foundation of Villa Park (Suburbs)',
    ],
    halalHubs: [
      'Devon Avenue (Deshi & Bangladeshi retail paradise)',
      'Bridgeview Arab commercial district',
      'Kedzie Avenue Middle Eastern food strip',
    ],
    metaDescription:
      'Get verified daily Muslim prayer times in Chicago, IL (Devon Ave, Loop, North Side). Live countdown, Qibla compass, and local meal ideas.',
    banglaTitle: 'শিকাগো, ইলিনয় নামাজের সময়সূচী',
  },

  'atlanta-ga': {
    slug: 'atlanta-ga',
    name: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    country: 'United States',
    countryCode: 'US',
    latitude: 33.749,
    longitude: -84.388,
    timeZone: 'America/New_York',
    intro:
      'Metro Atlanta’s Muslim community is rapidly expanding across Gwinnett, Fulton, and DeKalb counties, with energetic Bangladeshi diaspora hubs centered in Norcross, Duluth, and Lilburn. Flagship masajid such as Al-Farooq Masjid on 14th Street and the Atlanta Masjid of Al-Islam anchor religious education and charity across Georgia. Warm southern hospitality meets authentic deshi cuisine throughout Peachtree Corners and Lawrenceville.',
    nearbySlugs: ['charlotte-nc', 'birmingham-al', 'savannah-ga', 'nashville-tn'],
    prominentMosques: [
      'Al-Farooq Masjid of Atlanta (Midtown)',
      'Atlanta Masjid of Al-Islam (Fayetteville Rd)',
      'Baitul Salam Masjid (Norcross)',
      'Hamzah Islamic Center (Alpharetta)',
    ],
    halalHubs: [
      'Buford Highway International corridor',
      'Jimmy Carter Blvd (Norcross / Gwinnett halal row)',
      'Lawrenceville Highway deshi bakeries & markets',
    ],
    metaDescription:
      'Accurate Muslim prayer times in Atlanta & Norcross, GA today. Live next prayer countdown, Qibla compass, and authentic Bengali recipe pairings.',
    banglaTitle: 'আটলান্টা, জর্জিয়া নামাজের সময়সূচী',
  },

  'los-angeles-ca': {
    slug: 'los-angeles-ca',
    name: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    country: 'United States',
    countryCode: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
    timeZone: 'America/Los_Angeles',
    intro:
      'Southern California’s bustling metropolitan basin includes the officially designated "Little Bangladesh" neighborhood along 3rd Street in central Los Angeles. Landmark centers including the Islamic Center of Southern California on Vermont Ave and King Fahad Mosque in Culver City serve a cosmopolitan community. Year-round Pacific sun and mild coastal weather provide steady prayer routines for thousands of Angelenos.',
    nearbySlugs: ['san-diego-ca', 'san-jose-ca', 'san-francisco-ca', 'phoenix-az'],
    prominentMosques: [
      'Islamic Center of Southern California (ICSC)',
      'King Fahad Mosque (Culver City)',
      'Bangladesh Muslim Community Center (3rd St)',
      'Islamic Center of Hawthorne',
    ],
    halalHubs: [
      'Little Bangladesh on 3rd Street (Koreatown/Central LA)',
      'Westwood Boulevard Persian and halal dining',
      'Anaheim Little Arabia district',
    ],
    metaDescription:
      'Accurate Los Angeles, CA prayer times today (Little Bangladesh, Culver City, Downtown). Live countdown, Qibla compass, and local meal inspirations.',
    banglaTitle: 'লস অ্যাঞ্জেলেস, ক্যালিফোর্নিয়া নামাজের সময়সূচী',
  },

  'seattle-wa': {
    slug: 'seattle-wa',
    name: 'Seattle',
    state: 'Washington',
    stateCode: 'WA',
    country: 'United States',
    countryCode: 'US',
    latitude: 47.6062,
    longitude: -122.3321,
    timeZone: 'America/Los_Angeles',
    intro:
      'Nestled in the Pacific Northwest, Seattle’s Muslim population spans technology professionals and established families across King and Snohomish counties from Bellevue to Redmond and Lynnwood. Centers like the Islamic Center of Washington (ICW) and MAPS (Muslim Association of Puget Sound) provide state-of-the-art facilities. High-latitude adjustments built into our calculations ensure accurate Fajr and Isha timings during Washington’s extended summer solstices.',
    nearbySlugs: ['portland-or', 'vancouver-bc', 'spokane-wa', 'boise-id'],
    prominentMosques: [
      'Muslim Association of Puget Sound (MAPS, Redmond)',
      'Islamic Center of Seattle (Northgate)',
      'Islamic Center of Eastside (Bellevue)',
      'Al-Noor Mosque (Lynnwood)',
    ],
    halalHubs: [
      '148th Ave NE in Redmond & Bellevue halal strip',
      'International District halal dining',
      'Kent & Tukwila Somali & Deshi markets',
    ],
    metaDescription:
      'Seattle & Puget Sound Muslim prayer times with high-latitude summer adjustments, live countdown, Qibla compass, and family recipe ideas.',
    banglaTitle: 'সিয়াটল, ওয়াশিংটন নামাজের সময়সূচী',
  },

  'minneapolis-mn': {
    slug: 'minneapolis-mn',
    name: 'Minneapolis',
    state: 'Minnesota',
    stateCode: 'MN',
    country: 'United States',
    countryCode: 'US',
    latitude: 44.9778,
    longitude: -93.265,
    timeZone: 'America/Chicago',
    intro:
      'The Twin Cities boast an active, civically engaged Muslim community with historic milestones, including the public broadcasting of the adhan across city neighborhoods. Centers like Abubakar As-Saddique Islamic Center and the Islamic Cultural Community Center serve diverse families across Hennepin and Ramsey counties. The northern Minnesota latitude benefits directly from the app’s Twilight Angle calculations for summer nightfall.',
    nearbySlugs: ['chicago-il', 'milwaukee-wi', 'des-moines-ia', 'fargo-nd'],
    prominentMosques: [
      'Abubakar As-Saddique Islamic Center',
      'Islamic Cultural Community Center (ICCC)',
      'Dar Al-Hijrah (Cedar-Riverside)',
      'Masjid Al-Ihsan (St. Paul)',
    ],
    halalHubs: [
      'Cedar-Riverside (West Bank) halal markets and cafes',
      'Lake Street East African & South Asian retail',
      'Central Avenue Columbia Heights food district',
    ],
    metaDescription:
      'Minneapolis & St. Paul, MN prayer times today. Features live next prayer countdown, high-latitude rule for Minnesota summers, and Qibla compass.',
    banglaTitle: 'মিনিয়াপলিস, মিনেসোটা নামাজের সময়সূচী',
  },

  'philadelphia-pa': {
    slug: 'philadelphia-pa',
    name: 'Philadelphia',
    state: 'Pennsylvania',
    stateCode: 'PA',
    country: 'United States',
    countryCode: 'US',
    latitude: 39.9526,
    longitude: -75.1652,
    timeZone: 'America/New_York',
    intro:
      'Greater Philadelphia has deep American Muslim roots alongside an energetic Bangladeshi community in Upper Darby and West Philly. Vibrant neighborhood institutions including the Philadelphia Masjid and QAIMS anchor neighborhood life with food pantries, Quran circles, and celebratory gatherings. Access to local halal butcher shops and spice merchants along 69th Street makes evening family meals a cherished ritual.',
    nearbySlugs: ['new-york-ny', 'jersey-city-nj', 'baltimore-md', 'washington-dc'],
    prominentMosques: [
      'The Philadelphia Masjid (47th & Wyalusing)',
      'Masjid Al-Jamia (West Philly / University City)',
      'Upper Darby Islamic Center (69th St area)',
      'Baitul Mukarram Center of Upper Darby',
    ],
    halalHubs: [
      '69th Street & Market St in Upper Darby (Bangla hub)',
      'South Street & 40th Street halal dining',
      'Bustleton Avenue Northeast Philly markets',
    ],
    metaDescription:
      'Daily Muslim prayer times in Philadelphia & Upper Darby, PA. Live countdown to next salah, Qibla compass, and local mosque calibration.',
    banglaTitle: 'ফিলাডেলফিয়া, পেনসিলভানিয়া নামাজের সময়সূচী',
  },

  'boston-ma': {
    slug: 'boston-ma',
    name: 'Boston',
    state: 'Massachusetts',
    stateCode: 'MA',
    country: 'United States',
    countryCode: 'US',
    latitude: 42.3601,
    longitude: -71.0589,
    timeZone: 'America/New_York',
    intro:
      'Greater Boston’s world-renowned academic and medical hub is complemented by an active Muslim constituency across Roxbury, Cambridge, Quincy, and Malden. The landmark Islamic Society of Boston Cultural Center (ISBCC) in Roxbury stands as one of the largest mosques in New England, hosting thousands weekly. New England’s changing coastal seasons make accurate prayer schedules a staple for student and family life alike.',
    nearbySlugs: ['new-york-ny', 'providence-ri', 'hartford-ct', 'manchester-nh'],
    prominentMosques: [
      'Islamic Society of Boston Cultural Center (ISBCC, Roxbury)',
      'Islamic Society of Boston (Prospect St, Cambridge)',
      'Al-Huda Society (Chelsea)',
      'Islamic Center of New England (Sharon & Quincy)',
    ],
    halalHubs: [
      'Malden Pleasant Street halal groceries',
      'Somerville & Cambridge Broadway halal corridor',
      'Quincy Hancock Street markets',
    ],
    metaDescription:
      'Boston, MA prayer times today with live next prayer countdown, Qibla compass, ISNA & Hanafi calculations, and Bangladeshi meal ideas.',
    banglaTitle: 'বোস্টন, ম্যাসাচুসেটস নামাজের সময়সূচী',
  },

  // Supporting nearby hub entries so all nearby links resolve cleanly
  'sugar-land-tx': {
    slug: 'sugar-land-tx',
    name: 'Sugar Land',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 29.6197,
    longitude: -95.6349,
    timeZone: 'America/Chicago',
    intro:
      'Sugar Land and Fort Bend County house one of Texas’s highest concentrations of Bangladeshi and Muslim families. Thriving neighborhoods around Highway 6 and Sweetwater feature top halal dining and community institutions.',
    nearbySlugs: ['houston-tx', 'dallas-tx', 'austin-tx', 'san-antonio-tx'],
    prominentMosques: ['Masjid Maryam (Islamic Society of Greater Houston)', 'Al-Hadi Mosque'],
    halalHubs: ['Highway 6 South corridor', 'First Colony shopping centers'],
    metaDescription: 'Sugar Land, TX prayer times today with live next prayer countdown and Qibla compass.',
    banglaTitle: 'সুগার ল্যান্ড, টেক্সাস নামাজের সময়সূচী',
  },

  'irving-tx': {
    slug: 'irving-tx',
    name: 'Irving',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 32.814,
    longitude: -96.9489,
    timeZone: 'America/Chicago',
    intro:
      'Irving is central to North Texas Muslim life, anchored by Valley Ranch Islamic Center and an unmatched variety of South Asian and halal food spots along MacArthur and Belt Line.',
    nearbySlugs: ['dallas-tx', 'plano-tx', 'arlington-tx', 'houston-tx'],
    prominentMosques: ['Valley Ranch Islamic Center (VRIC)', 'Irving Masjid'],
    halalHubs: ['North MacArthur Blvd', 'Belt Line Road'],
    metaDescription: 'Irving, TX prayer times today with Valley Ranch local adjustments and live countdown.',
    banglaTitle: 'আরভিং, টেক্সাস নামাজের সময়সূচী',
  },

  'plano-tx': {
    slug: 'plano-tx',
    name: 'Plano',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 33.0198,
    longitude: -96.6989,
    timeZone: 'America/Chicago',
    intro:
      'Plano is celebrated for East Plano Islamic Center (EPIC) and family-friendly suburban neighborhoods with exceptional halal butcheries and bakeries.',
    nearbySlugs: ['dallas-tx', 'irving-tx', 'arlington-tx', 'houston-tx'],
    prominentMosques: ['East Plano Islamic Center (EPIC)', 'Plano Masjid'],
    halalHubs: ['Spring Creek Parkway', 'K Avenue halal markets'],
    metaDescription: 'Plano & Richardson, TX prayer times today with live countdown and Qibla dial.',
    banglaTitle: 'প্ল্যানো, টেক্সাস নামাজের সময়সূচী',
  },

  'arlington-tx': {
    slug: 'arlington-tx',
    name: 'Arlington',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 32.7357,
    longitude: -97.1081,
    timeZone: 'America/Chicago',
    intro:
      'Located midway between Dallas and Fort Worth, Arlington hosts vibrant student and immigrant communities anchored by the Islamic Society of Arlington Texas (ISAT).',
    nearbySlugs: ['dallas-tx', 'irving-tx', 'plano-tx', 'houston-tx'],
    prominentMosques: ['Islamic Society of Arlington Texas (ISAT)', 'UTA Muslim Student Center'],
    halalHubs: ['Pioneer Parkway halal dining', 'Cooper Street markets'],
    metaDescription: 'Arlington, TX prayer times today with live countdown and Qibla compass.',
    banglaTitle: 'আর্লিংটন, টেক্সাস নামাজের সময়সূচী',
  },

  'paterson-nj': {
    slug: 'paterson-nj',
    name: 'Paterson',
    state: 'New Jersey',
    stateCode: 'NJ',
    country: 'United States',
    countryCode: 'US',
    latitude: 40.9168,
    longitude: -74.1718,
    timeZone: 'America/New_York',
    intro:
      'Paterson is renowned for its historic South Little Falls and South Paterson Arab and Bengali neighborhoods with celebrated halal cuisine and the historic Islamic Center of Passaic County (ICPC).',
    nearbySlugs: ['jersey-city-nj', 'new-york-ny', 'newark-nj', 'philadelphia-pa'],
    prominentMosques: ['Islamic Center of Passaic County (ICPC)', 'Jalalabad Jame Masjid'],
    halalHubs: ['Main Street South Paterson', 'Union Avenue deshi groceries'],
    metaDescription: 'Paterson, NJ prayer times today with live countdown, Qibla compass, and local timings.',
    banglaTitle: 'প্যাটারসন, নিউ জার্সি নামাজের সময়সূচী',
  },

  'hamtramck-mi': {
    slug: 'hamtramck-mi',
    name: 'Hamtramck',
    state: 'Michigan',
    stateCode: 'MI',
    country: 'United States',
    countryCode: 'US',
    latitude: 42.3928,
    longitude: -83.0513,
    timeZone: 'America/Detroit',
    intro:
      'America’s historic Muslim-majority enclave, Hamtramck features public calls to prayer, Bengali street signs, and beloved tea stalls along Conant Avenue.',
    nearbySlugs: ['detroit-mi', 'warren-mi', 'chicago-il', 'columbus-oh'],
    prominentMosques: ['Al-Falah Jame Masjid', 'Masjid Abu Bakr', 'Masjid Taqwa'],
    halalHubs: ['Conant Avenue Bangla Town', 'Joseph Campau Avenue'],
    metaDescription: 'Hamtramck, MI prayer times today with live countdown, Qibla compass, and local timings.',
    banglaTitle: 'হ্যামট্রম্যাক, মিশিগান নামাজের সময়সূচী',
  },

  'warren-mi': {
    slug: 'warren-mi',
    name: 'Warren',
    state: 'Michigan',
    stateCode: 'MI',
    country: 'United States',
    countryCode: 'US',
    latitude: 42.5145,
    longitude: -83.0147,
    timeZone: 'America/Detroit',
    intro:
      'Warren and Sterling Heights are premier centers for Bangladeshi family living in Michigan, housing major masajid and festive summer Eid festivals.',
    nearbySlugs: ['detroit-mi', 'hamtramck-mi', 'chicago-il', 'columbus-oh'],
    prominentMosques: ['Baitul Mukarram Jame Masjid of Warren', 'Sterling Heights Islamic Center'],
    halalHubs: ['Ryan Road halal strip', 'Dequindre Road markets'],
    metaDescription: 'Warren & Sterling Heights, MI prayer times today with live countdown and Qibla.',
    banglaTitle: 'ওয়ারেন, মিশিগান নামাজের সময়সূচী',
  },

  'alexandria-va': {
    slug: 'alexandria-va',
    name: 'Alexandria',
    state: 'Virginia',
    stateCode: 'VA',
    country: 'United States',
    countryCode: 'US',
    latitude: 38.8048,
    longitude: -77.0469,
    timeZone: 'America/New_York',
    intro:
      'Alexandria and Northern Virginia boast an active Muslim community in close proximity to historic monuments, federal corridors, and vibrant cultural centers.',
    nearbySlugs: ['washington-dc', 'silver-spring-md', 'baltimore-md', 'philadelphia-pa'],
    prominentMosques: ['Dar Al-Hijrah Islamic Center', 'Masjid Bilal Alexandria'],
    halalHubs: ['Beauregard Street halal markets', 'King Street Middle Eastern cafes'],
    metaDescription: 'Alexandria & Arlington, VA prayer times today with live countdown and Qibla direction.',
    banglaTitle: 'আলেকজান্দ্রিয়া, ভার্জিনিয়া নামাজের সময়সূচী',
  },

  'silver-spring-md': {
    slug: 'silver-spring-md',
    name: 'Silver Spring',
    state: 'Maryland',
    stateCode: 'MD',
    country: 'United States',
    countryCode: 'US',
    latitude: 39.0069,
    longitude: -77.0264,
    timeZone: 'America/New_York',
    intro:
      'Silver Spring is home to a proud Bangladeshi and Muslim community in Montgomery County with thriving weekend schools, fish markets, and halal delis.',
    nearbySlugs: ['washington-dc', 'alexandria-va', 'baltimore-md', 'philadelphia-pa'],
    prominentMosques: ['Muslim Community Center (MCC Silver Spring)', 'Takoma Park Masjid'],
    halalHubs: ['University Blvd East', 'Colesville Road deshi groceries'],
    metaDescription: 'Silver Spring, MD prayer times today with live countdown and Qibla direction.',
    banglaTitle: 'সিলভার স্প্রিং, মেরিল্যান্ড নামাজের সময়সূচী',
  },

  'baltimore-md': {
    slug: 'baltimore-md',
    name: 'Baltimore',
    state: 'Maryland',
    stateCode: 'MD',
    country: 'United States',
    countryCode: 'US',
    latitude: 39.2904,
    longitude: -76.6122,
    timeZone: 'America/New_York',
    intro:
      'Baltimore’s diverse Muslim community spans historic masajid, university student groups at Johns Hopkins and UMBC, and active neighborhood welfare initiatives.',
    nearbySlugs: ['washington-dc', 'silver-spring-md', 'philadelphia-pa', 'alexandria-va'],
    prominentMosques: ['Islamic Society of Baltimore (ISB / Masjid Al-Rahmah)', 'Masjid Ul-Haqq'],
    halalHubs: ['Rolling Road (Catonsville)', 'Security Blvd halal dining'],
    metaDescription: 'Baltimore, MD prayer times today with live countdown and Qibla compass.',
    banglaTitle: 'বাল্টিমোর, মেরিল্যান্ড নামাজের সময়সূচী',
  },

  'austin-tx': {
    slug: 'austin-tx',
    name: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 30.2672,
    longitude: -97.7431,
    timeZone: 'America/Chicago',
    intro:
      'Austin’s fast-growing Muslim community spans high-tech corridors and university campus life with active centers like the Islamic Center of Greater Austin (ICGA) on Nueces.',
    nearbySlugs: ['houston-tx', 'dallas-tx', 'san-antonio-tx', 'sugar-land-tx'],
    prominentMosques: ['Islamic Center of Greater Austin (ICGA)', 'North Austin Muslim Community Center (NAMCC)'],
    halalHubs: ['North Lamar Boulevard', 'Round Rock halal corridor'],
    metaDescription: 'Austin, TX prayer times today with live countdown and Qibla compass.',
    banglaTitle: 'অস্টিন, টেক্সাস নামাজের সময়সূচী',
  },

  'san-antonio-tx': {
    slug: 'san-antonio-tx',
    name: 'San Antonio',
    state: 'Texas',
    stateCode: 'TX',
    country: 'United States',
    countryCode: 'US',
    latitude: 29.4241,
    longitude: -98.4936,
    timeZone: 'America/Chicago',
    intro:
      'San Antonio features a welcoming Muslim community anchored by the Islamic Center of San Antonio (ICSA) and thriving medical and military family associations.',
    nearbySlugs: ['austin-tx', 'houston-tx', 'dallas-tx'],
    prominentMosques: ['Islamic Center of San Antonio (ICSA)', 'Masjid Al-Madina'],
    halalHubs: ['Wurzbach Road Mediterranean strip', 'Babcock Road halal markets'],
    metaDescription: 'San Antonio, TX prayer times today with live countdown and Qibla direction.',
    banglaTitle: 'সান আন্তোনিও, টেক্সাস নামাজের সময়সূচী',
  },
};

export function getSeoCityBySlug(slug: string): SeoCity | undefined {
  return SEO_CITIES[slug];
}

export function getAllSeoCities(): SeoCity[] {
  return Object.values(SEO_CITIES);
}
