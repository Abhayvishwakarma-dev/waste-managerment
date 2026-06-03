
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ---------- LOCAL CLASSIFICATION (no API call) ----------
// // Add as many items as you want; the AI will only be called for unknown items.
// const localClassification = (item) => {
//   const lower = item.toLowerCase();

//   // Wet / Organic waste
//   if (/banana|apple|orange|peel|food|vegetable|fruit|leftover|egg|bread|rice|meal|tea bag|coffee ground|garden|flower|leaf/.test(lower)) {
//     return {
//       category: 'Wet Waste',
//       disposalMethod: 'Place in green bin for composting',
//       recyclingMethod: 'Convert to compost for soil enrichment',
//       environmentalImpact: 'Reduces methane emissions from landfills',
//       tips: 'Keep a separate bin for organic kitchen waste',
//     };
//   }

//   // Dry / Recyclable
//   if (/plastic bottle|plastic bag|paper|cardboard|glass|metal|can|tin|aluminium|newspaper|magazine|carton|plastic container|jar/.test(lower)) {
//     return {
//       category: 'Dry Waste',
//       disposalMethod: 'Put in blue recycling bin',
//       recyclingMethod: 'Clean, sort, and send to recycling facility',
//       environmentalImpact: 'Saves energy and raw materials',
//       tips: 'Rinse containers before recycling',
//     };
//   }

//   // E-Waste
//   if (/phone|mobile|laptop|computer|charger|cable|battery|electronic|tv|monitor|keyboard|mouse|headphone|earbud|tablet|circuit|adapter/.test(lower)) {
//     return {
//       category: 'E-Waste',
//       disposalMethod: 'Take to authorised e‑waste collection centre',
//       recyclingMethod: 'Recover precious metals and components',
//       environmentalImpact: 'Prevents toxic leaching into soil and water',
//       tips: 'Never throw electronics into household bins',
//     };
//   }

//   // Hazardous
//   if (/paint|chemical|pesticide|medicine|syringe|needle|oil|fuel|battery acid|bleach|cleaner|solvent/.test(lower)) {
//     return {
//       category: 'Hazardous Waste',
//       disposalMethod: 'Drop at hazardous waste facility',
//       recyclingMethod: 'Neutralise or incinerate under controlled conditions',
//       environmentalImpact: 'Prevents severe pollution and health risks',
//       tips: 'Store in sealed containers away from children',
//     };
//   }

//   // If no match, return null → will call Gemini
//   return null;
// };

// // ---------- HELPER ----------
// const extractJSON = (text) => {
//   const match = text.match(/\{[\s\S]*\}/);
//   return match ? JSON.parse(match[0]) : null;
// };

// // ---------- CLASSIFY (local first, then AI) ----------
// const classifyWaste = async (item) => {
//   // 1. Try local classification
//   const local = localClassification(item);
//   if (local) return local;

//   // 2. Fallback to Gemini AI
//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
//     const prompt = `Classify "${item}" into Wet/Dry/E‑Waste/Hazardous. Return ONLY JSON: {"category":"...","disposalMethod":"...","recyclingMethod":"...","environmentalImpact":"...","tips":"..."}`;
//     const result = await model.generateContent(prompt);
//     const parsed = extractJSON(result.response.text());
//     if (parsed?.category) return parsed;
//   } catch (error) {
//     console.error('Gemini classify error:', error.message);
//   }

//   // 3. Ultimate fallback
//   return {
//     category: 'Unknown',
//     disposalMethod: 'Check local guidelines',
//     recyclingMethod: 'Contact municipal waste management',
//     environmentalImpact: 'Improper disposal harms the environment',
//     tips: 'Always segregate waste at source',
//   };
// };

// // ---------- CHAT (try Gemini, otherwise use a smart offline reply) ----------
// const chatWithGemini = async (message, history = []) => {
//   // First, try using the AI
//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
//     const prompt = `You are EcoSort AI, a sustainability expert. Answer: ${message}`;
//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (error) {
//     console.error('Gemini chat error:', error.message);
//     // Offline intelligent fallback
//     const lower = message.toLowerCase();
//     if (lower.includes('plastic')) {
//       return 'To recycle plastic, rinse the item, remove caps/labels, and place it in your recycling bin. Check local rules for plastic types.';
//     } else if (lower.includes('battery')) {
//       return 'Batteries must be taken to a special e‑waste drop‑off or a store that collects used batteries. Never put them in regular trash.';
//     } else if (lower.includes('reduce') || lower.includes('household waste')) {
//       return 'You can reduce household waste by composting, buying in bulk, avoiding single‑use plastics, and repairing items instead of replacing them.';
//     } else {
//       return 'I am temporarily unable to connect to the AI. Please try again later, or check our waste classification guide.';
//     }
//   }
// };

// module.exports = { classifyWaste, chatWithGemini };




// Fully offline waste‑classification & chatbot – no Gemini API needed
const localClassification = (item) => {
  const lower = item.toLowerCase();
  // ... classification logic (unchanged) ...
  // (keep the existing classification function exactly as before)
  if (/banana|apple|orange|peel|food|vegetable|fruit|leftover|egg|bread|rice|meal|tea bag|coffee ground|garden|flower|leaf/.test(lower)) {
    return {
      category: 'Wet Waste',
      disposalMethod: 'Place in green bin for composting',
      recyclingMethod: 'Convert to compost for soil enrichment',
      environmentalImpact: 'Reduces methane emissions from landfills',
      tips: 'Keep a separate bin for organic kitchen waste',
    };
  }
  if (/plastic bottle|plastic bag|paper|cardboard|glass|metal|can|tin|aluminium|newspaper|magazine|carton|plastic container|jar/.test(lower)) {
    return {
      category: 'Dry Waste',
      disposalMethod: 'Put in blue recycling bin',
      recyclingMethod: 'Clean, sort, and send to recycling facility',
      environmentalImpact: 'Saves energy and raw materials',
      tips: 'Rinse containers before recycling',
    };
  }
  if (/phone|mobile|laptop|computer|charger|cable|battery|electronic|tv|monitor|keyboard|mouse|headphone|earbud|tablet|circuit|adapter/.test(lower)) {
    return {
      category: 'E-Waste',
      disposalMethod: 'Take to authorised e‑waste collection centre',
      recyclingMethod: 'Recover precious metals and components',
      environmentalImpact: 'Prevents toxic leaching into soil and water',
      tips: 'Never throw electronics into household bins',
    };
  }
  if (/paint|chemical|pesticide|medicine|syringe|needle|oil|fuel|battery acid|bleach|cleaner|solvent/.test(lower)) {
    return {
      category: 'Hazardous Waste',
      disposalMethod: 'Drop at hazardous waste facility',
      recyclingMethod: 'Neutralise or incinerate under controlled conditions',
      environmentalImpact: 'Prevents severe pollution and health risks',
      tips: 'Store in sealed containers away from children',
    };
  }
  return {
    category: 'Unknown',
    disposalMethod: 'Check local guidelines',
    recyclingMethod: 'Contact municipal waste management',
    environmentalImpact: 'Improper disposal harms the environment',
    tips: 'Always segregate waste at source',
  };
};

const classifyWaste = async (item) => {
  return localClassification(item);
};

// ---------- EXTENDED OFFLINE CHATBOT ----------
const chatWithGemini = async (message, history = []) => {
  const msg = message.toLowerCase().trim();

  // ----- PLASTICS -----
  if (containsAny(msg, ['plastic', 'plastics'])) {
    if (containsAny(msg, ['recycle', 'recycling'])) return 'Rinse plastic items, remove caps and labels, and place them in your recycling bin. Check local rules – not all plastics are accepted everywhere.';
    if (containsAny(msg, ['dispose', 'throw', 'get rid'])) return 'Most plastic waste should go into the recycling bin after cleaning. If the plastic is non‑recyclable (like some wrappers), it must go into general waste.';
    if (containsAny(msg, ['type', 'types', 'numbers', 'codes'])) return 'Plastics are categorised by numbers 1–7. Types 1 (PET) and 2 (HDPE) are widely recycled. Check the triangle symbol on the item.';
    if (containsAny(msg, ['reduce', 'less', 'avoid'])) return 'Reduce plastic use by carrying reusable bags, bottles, and containers. Choose products with minimal packaging.';
    if (containsAny(msg, ['pollution', 'ocean', 'environment'])) return 'Plastic pollution harms marine life and ecosystems. Proper disposal and recycling help reduce this impact.';
    return 'Plastic waste should be cleaned and placed in the recycling bin. If unsure, check your local recycling guidelines.';
  }

  // ----- BATTERIES -----
  if (containsAny(msg, ['batteries', 'battery'])) {
    if (containsAny(msg, ['dispose', 'throw', 'recycle'])) return 'Batteries must never go in household trash. Take them to a battery recycling point or an e‑waste collection centre. Many supermarkets have collection bins.';
    if (containsAny(msg, ['car battery', 'vehicle battery'])) return 'Car batteries contain lead and acid – they are hazardous. Return them to a garage or an authorised recycling centre.';
    if (containsAny(msg, ['rechargeable', 'lithium', 'li-ion'])) return 'Rechargeable batteries (Li‑ion, NiMH) should be recycled at dedicated collection points, not thrown away.';
    return 'Batteries require special disposal. Look for battery recycling bins at stores or e‑waste centres.';
  }

  // ----- ELECTRONICS / E‑WASTE -----
  if (containsAny(msg, ['e-waste', 'electronic waste', 'electronics'])) {
    if (containsAny(msg, ['dispose', 'throw', 'recycle'])) return 'E‑waste must be taken to an authorised collection centre. Many cities offer free pick‑up events. Do not dump electronics in regular bins.';
    if (containsAny(msg, ['old phone', 'old laptop', 'old computer'])) return 'Old devices can often be traded in, donated, or recycled at an e‑waste facility. Wipe your data first!';
    if (containsAny(msg, ['why recycle', 'important'])) return 'Recycling electronics recovers precious metals like gold and copper, and prevents toxic chemicals from polluting the environment.';
    return 'E‑waste includes anything with a plug or battery. Always use designated e‑waste channels.';
  }

  // ----- ORGANIC WASTE / COMPOSTING -----
  if (containsAny(msg, ['organic waste', 'food waste', 'kitchen waste', 'compost', 'composting'])) {
    if (containsAny(msg, ['start', 'begin', 'how to'])) return 'Start composting by collecting fruit/vegetable peels, coffee grounds, eggshells, and yard waste in a bin. Turn the pile occasionally and keep it moist. It will become rich soil in a few months.';
    if (containsAny(msg, ['what can', 'what to', 'items'])) return 'Compostable items include: fruit & vegetable scraps, eggshells, coffee grounds, tea bags, leaves, grass clippings, and untreated paper. Avoid meat, dairy, and oily foods.';
    if (containsAny(msg, ['benefits', 'why'])) return 'Composting reduces landfill methane, enriches soil, and reduces the need for chemical fertilisers.';
    return 'Composting turns organic waste into nutrient‑rich soil. Keep a separate bin for food scraps.';
  }

  // ----- GLASS -----
  if (containsAny(msg, ['glass'])) {
    if (containsAny(msg, ['recycle', 'dispose'])) return 'Glass bottles and jars should be rinsed and placed in the recycling bin. Remove metal lids and recycle them separately if required.';
    if (containsAny(msg, ['broken glass', 'shattered'])) return 'Broken glass is dangerous. Wrap it carefully in newspaper and place it in the general waste bin – do not put it in recycling.';
    if (containsAny(msg, ['colours', 'colour', 'clear', 'green', 'brown'])) return 'Glass is sorted by colour for recycling. Clear, green, and brown glass should be kept separate in many programmes.';
    return 'Glass is 100% recyclable. Always rinse and remove lids before recycling.';
  }

  // ----- PAPER / CARDBOARD -----
  if (containsAny(msg, ['paper', 'cardboard', 'newspaper', 'magazine', 'carton'])) {
    if (containsAny(msg, ['recycle', 'dispose'])) return 'Paper and cardboard should be clean and dry before recycling. Flatten boxes to save space.';
    if (containsAny(msg, ['shredded paper'])) return 'Shredded paper can be recycled, but place it in a paper bag so it does not scatter. Some programmes require it in general waste.';
    if (containsAny(msg, ['pizza box', 'greasy'])) return 'Greasy pizza boxes cannot be recycled because oil contaminates the paper fibres. Tear off the clean parts for recycling, and compost or trash the greasy part.';
    return 'Paper and cardboard are widely recyclable. Keep them dry and free from food residue.';
  }

  // ----- HAZARDOUS WASTE -----
  if (containsAny(msg, ['hazardous waste', 'dangerous waste'])) {
    if (containsAny(msg, ['example', 'examples', 'what is'])) return 'Hazardous waste includes chemicals, paints, solvents, pesticides, batteries, and medical waste. These require special disposal.';
    if (containsAny(msg, ['dispose', 'get rid'])) return 'Take hazardous waste to a dedicated drop‑off facility. Never pour chemicals down the drain or into the trash.';
    return 'Hazardous waste is harmful to health and the environment. Always use designated collection services.';
  }

  // ----- METALS -----
  if (containsAny(msg, ['metal', 'aluminium', 'aluminum', 'tin', 'steel'])) {
    if (containsAny(msg, ['can', 'cans'])) return 'Aluminium and steel cans are recyclable. Rinse them and place them in the recycling bin.';
    if (containsAny(msg, ['scrap metal'])) return 'Large metal items can often be taken to a scrap metal dealer or a special recycling centre.';
    return 'Metals are valuable recyclables. Clean and separate them according to local rules.';
  }

  // ----- GENERAL REDUCE / REUSE / RECYCLE -----
  if (containsAny(msg, ['reduce', 'reuse', 'recycle', '3r', 'three r'])) {
    if (containsAny(msg, ['tips', 'how to', 'ways'])) return '1️⃣ Reduce: buy only what you need. 2️⃣ Reuse: use items multiple times (bags, jars, containers). 3️⃣ Recycle: properly sort waste so materials can be processed.';
    if (containsAny(msg, ['difference', 'vs'])) return 'Reduce = use less. Reuse = use again. Recycle = turn waste into new products.';
    return 'Follow the 3Rs: Reduce, Reuse, Recycle – in that order!';
  }

  // ----- CLOTHES / TEXTILES -----
  if (containsAny(msg, ['clothes', 'clothing', 'textile', 'fabric', 'shoe'])) {
    if (containsAny(msg, ['dispose', 'throw', 'recycle'])) return 'Old clothes and shoes can be donated to charity shops, placed in textile recycling banks, or repurposed as cleaning rags.';
    return 'Textile waste is a growing problem. Donate, sell, or recycle unwanted clothes instead of trashing them.';
  }

  // ----- FURNITURE / BULKY ITEMS -----
  if (containsAny(msg, ['furniture', 'mattress', 'sofa', 'table', 'chair'])) {
    if (containsAny(msg, ['dispose', 'throw'])) return 'Large items like furniture should be taken to a recycling centre or collected by a bulky waste service. Some charities accept usable furniture.';
    return 'Don’t dump bulky waste illegally – contact your local council for collection options.';
  }

  // ----- MEDICAL / PHARMACEUTICAL -----
  if (containsAny(msg, ['medicine', 'drug', 'pill', 'prescription', 'syringe'])) {
    return 'Unused or expired medicines should be returned to a pharmacy for safe disposal. Never flush them down the toilet or throw them in the trash.';
  }

  // ----- COOKING OIL -----
  if (containsAny(msg, ['cooking oil', 'oil disposal'])) {
    return 'Cooking oil should never be poured down the sink. Collect it in a sealed container and dispose of it at a recycling centre or with hazardous waste.';
  }

  // ----- LIGHT BULBS -----
  if (containsAny(msg, ['light bulb', 'led', 'cfl'])) {
    if (containsAny(msg, ['dispose', 'recycle'])) return 'CFL bulbs contain mercury and must be taken to a hazardous waste facility. LED and incandescent bulbs can go in the trash, but recycling is better.';
    return 'Take old bulbs to a recycling point – many hardware stores accept them.';
  }

  // ----- TYRES -----
  if (containsAny(msg, ['tyre', 'tire'])) {
    return 'Tyres should be taken to a tyre recycling facility or returned to the dealer when you buy new ones. Never burn tyres – it releases toxic fumes.';
  }

  // ----- CHRISTMAS / DECORATIONS -----
  if (containsAny(msg, ['christmas tree', 'decoration', 'holiday'])) {
    return 'Real Christmas trees can be composted or turned into mulch. Artificial trees are not recyclable and should be reused for as long as possible.';
  }

  // ----- PET WASTE -----
  if (containsAny(msg, ['pet waste', 'dog poo', 'cat litter'])) {
    return 'Pet waste should be bagged and placed in the general waste bin. Do not compost it – it can contain harmful pathogens.';
  }

  // ----- DIAPERS / NAPPIES -----
  if (containsAny(msg, ['diaper', 'nappy'])) {
    return 'Disposable diapers go into general waste. Consider reusable cloth diapers to reduce landfill waste.';
  }

  // ----- CIGARETTE BUTTS -----
  if (containsAny(msg, ['cigarette', 'smoking', 'butt'])) {
    return 'Cigarette butts are not biodegradable and contain plastic. Always dispose of them in a bin – never throw them on the ground.';
  }

  // ----- CHEWING GUM -----
  if (containsAny(msg, ['chewing gum', 'gum'])) {
    return 'Chewing gum is not biodegradable. Wrap it in paper and place it in a general waste bin.';
  }

  // ----- BIODEGRADABLE vs COMPOSTABLE -----
  if (containsAny(msg, ['biodegradable', 'compostable', 'degradable'])) {
    return 'Biodegradable means it breaks down naturally (but may leave microplastics). Compostable means it turns into nutrient‑rich soil under specific conditions. Check the label!';
  }

  // ----- LANDFILL -----
  if (containsAny(msg, ['landfill'])) {
    return 'Landfills are sites where waste is buried. They produce methane and can contaminate groundwater. Reducing waste helps extend landfill lifespans.';
  }

  // ----- INCINERATION -----
  if (containsAny(msg, ['incineration', 'burn waste'])) {
    return 'Waste incineration can generate energy but also releases pollutants. Modern plants use filters to reduce emissions. Recycling is still a better option.';
  }

  // ----- CIRCULAR ECONOMY -----
  if (containsAny(msg, ['circular economy'])) {
    return 'A circular economy keeps resources in use for as long as possible, extracting maximum value before recovering and regenerating products and materials.';
  }

  // ----- ZERO WASTE -----
  if (containsAny(msg, ['zero waste', 'zero-waste'])) {
    return 'Zero waste is a lifestyle that aims to send nothing to landfill or incineration. Start by refusing single‑use items and composting organic waste.';
  }

  // ----- UPCYCLING -----
  if (containsAny(msg, ['upcycle', 'upcycling'])) {
    return 'Upcycling transforms waste materials into new products of higher quality or value – like turning old pallets into furniture.';
  }

  // ----- WASTE SEGREGATION AT SOURCE -----
  if (containsAny(msg, ['segregation', 'separate waste', 'sort waste'])) {
    return 'Waste should be separated into wet, dry, and hazardous categories at home. This makes recycling and composting far more efficient.';
  }

  // ----- PLASTIC BAGS -----
  if (containsAny(msg, ['plastic bag'])) {
    return 'Plastic bags are often not accepted in curbside recycling. Many supermarkets collect them for recycling. Better yet – use reusable bags.';
  }

  // ----- STYROFOAM / THERMOCOL -----
  if (containsAny(msg, ['styrofoam', 'thermocol', 'polystyrene'])) {
    return 'Polystyrene foam is rarely recyclable and takes centuries to decompose. Avoid using it and choose biodegradable alternatives.';
  }

  // ----- TETRA PAK / CARTONS -----
  if (containsAny(msg, ['tetra pak', 'juice carton', 'milk carton'])) {
    return 'Tetra Pak cartons are recyclable in many areas. Rinse them and place them in the recycling bin. Some facilities need them dropped off separately.';
  }

  // ----- CLING FILM / PLASTIC WRAP -----
  if (containsAny(msg, ['cling film', 'plastic wrap', 'saran wrap'])) {
    return 'Most cling film is not recyclable through curbside programmes. Reduce usage by switching to beeswax wraps or reusable containers.';
  }

  // ----- COFFEE CUPS -----
  if (containsAny(msg, ['coffee cup', 'disposable cup'])) {
    return 'Disposable coffee cups have a plastic lining – they are not easily recyclable. Bring your own reusable cup!';
  }

  // ----- STRAWS -----
  if (containsAny(msg, ['straw'])) {
    return 'Plastic straws are a major pollutant. Switch to paper, metal, or bamboo straws, or skip them entirely.';
  }

  // ----- FOOD DELIVERY CONTAINERS -----
  if (containsAny(msg, ['food container', 'takeaway container'])) {
    return 'Clean plastic and aluminium containers can be recycled. Soiled or greasy ones must go into general waste.';
  }

  // ----- OLD MEDICINE -----
  if (containsAny(msg, ['expired medicine', 'old medicine'])) {
    return 'Return expired medicines to your local pharmacy. Do not flush them or put them in household waste.';
  }

  // ----- PAINT -----
  if (containsAny(msg, ['paint'])) {
    return 'Latex paint can be dried out and disposed of with regular trash (check local rules). Oil‑based paint is hazardous waste – take it to a collection facility.';
  }

  // ----- NAIL POLISH -----
  if (containsAny(msg, ['nail polish'])) {
    return 'Nail polish is considered hazardous waste. Take it to a household hazardous waste drop‑off.';
  }

  // ----- COSMETICS -----
  if (containsAny(msg, ['makeup', 'cosmetics', 'lipstick'])) {
    return 'Empty cosmetic containers can sometimes be recycled, but check local rules. Some brands offer take‑back programmes.';
  }

  // ----- TOOTHBRUSH -----
  if (containsAny(msg, ['toothbrush'])) {
    return 'Manual toothbrushes are not recyclable through curbside programmes. Switch to bamboo toothbrushes or use a subscription service that recycles old ones.';
  }

  // ----- RAZOR BLADES -----
  if (containsAny(msg, ['razor', 'blade'])) {
    return 'Razor blades are sharp and cannot be recycled. Place them in a secure container before throwing them in general waste. Some brands offer mail‑back recycling.';
  }

  // ----- PRINTER CARTRIDGES -----
  if (containsAny(msg, ['printer cartridge', 'ink cartridge', 'toner'])) {
    return 'Ink and toner cartridges can be refilled or recycled. Many office supply stores have drop‑off boxes.';
  }

  // ----- CDs / DVDs -----
  if (containsAny(msg, ['cd', 'dvd', 'blu-ray'])) {
    return 'Old CDs and DVDs are not curbside recyclable. Consider donating them or sending them to specialised recyclers.';
  }

  // ----- VHS TAPES -----
  if (containsAny(msg, ['vhs', 'video tape'])) {
    return 'VHS tapes are difficult to recycle. Check for a specialist e‑waste recycler that accepts them.';
  }

  // ----- BOOKS -----
  if (containsAny(msg, ['book', 'books'])) {
    return 'Donate old books to libraries, schools, or charity shops. If damaged, they can go into paper recycling after removing covers if they are not paper.';
  }

  // ----- PENS & MARKERS -----
  if (containsAny(msg, ['pen', 'marker'])) {
    return 'Most pens and markers are not recyclable. Some brands run recycling programmes – check their websites.';
  }

  // ----- TOYS -----
  if (containsAny(msg, ['toy', 'toys'])) {
    return 'Donate usable toys to charity. Broken plastic toys usually go into general waste unless made of a single recyclable plastic.';
  }

  // ----- SPORTS EQUIPMENT -----
  if (containsAny(msg, ['sports equipment', 'tennis racket', 'bicycle'])) {
    return 'Donate old sports gear if usable. Many recycling centres accept metal and mixed‑material sports items.';
  }

  // ----- CARPET -----
  if (containsAny(msg, ['carpet'])) {
    return 'Carpet is difficult to recycle – check for specialist carpet recycling services. Some retailers take back old carpet when installing new.';
  }

  // ----- MATTRESS -----
  if (containsAny(msg, ['mattress'])) {
    return 'Mattresses can be recycled at dedicated facilities. Many councils offer bulky waste collection for a small fee.';
  }

  // ----- WINDOW GLASS -----
  if (containsAny(msg, ['window glass', 'mirror'])) {
    return 'Window glass and mirrors have a different composition from bottle glass and are usually not accepted in curbside recycling. Dispose of them with general waste or at a construction waste facility.';
  }

  // ----- CERAMICS -----
  if (containsAny(msg, ['ceramic', 'pottery', 'mug'])) {
    return 'Ceramics cannot be recycled with glass. If intact, donate them. Broken ceramics go into general waste.';
  }

  // ----- ASBESTOS -----
  if (containsAny(msg, ['asbestos'])) {
    return 'Asbestos is extremely hazardous. Do not handle it yourself. Contact a licensed asbestos removal specialist.';
  }

  // ----- SMOKE DETECTORS -----
  if (containsAny(msg, ['smoke detector'])) {
    return 'Some smoke detectors contain radioactive material and must be returned to the manufacturer or taken to hazardous waste collection.';
  }

  // ----- FIRE EXTINGUISHERS -----
  if (containsAny(msg, ['fire extinguisher'])) {
    return 'Fire extinguishers are pressurised and should be taken to a hazardous waste facility or a fire equipment service company.';
  }

  // ----- GAS CYLINDERS -----
  if (containsAny(msg, ['gas cylinder', 'propane tank'])) {
    return 'Gas cylinders must never be thrown in regular trash. Return them to the supplier or a hazardous waste facility.';
  }

  // ----- AEROSOL CANS -----
  if (containsAny(msg, ['aerosol', 'spray can'])) {
    return 'Empty aerosol cans can often be recycled with metals. If not empty, they are hazardous waste. Never puncture or burn them.';
  }

  // ----- FERROUS vs NON‑FERROUS -----
  if (containsAny(msg, ['ferrous', 'non-ferrous'])) {
    return 'Ferrous metals contain iron and are magnetic. Non‑ferrous metals (aluminium, copper, brass) are not. Both are recyclable.';
  }

  // ----- CONSTRUCTION WASTE -----
  if (containsAny(msg, ['construction', 'demolition', 'rubble', 'brick'])) {
    return 'Construction waste like bricks, concrete, and wood should go to a construction and demolition waste recycling centre. Never mix it with household waste.';
  }

  // ----- GARDEN WASTE -----
  if (containsAny(msg, ['garden waste', 'yard waste', 'grass', 'leaves'])) {
    return 'Garden waste can be composted at home or placed in a green waste bin if your municipality provides one.';
  }

  // ----- WOOD -----
  if (containsAny(msg, ['wood'])) {
    return 'Untreated wood can be composted or recycled. Painted or treated wood may need to go to a special facility.';
  }

  // ----- ASHES -----
  if (containsAny(msg, ['ash', 'ashes'])) {
    return 'Wood ash can be used in the garden (in moderation) to add potassium. Coal ash should be disposed of in general waste. Always ensure ashes are completely cold.';
  }

  // ----- WASTE STATISTICS (if someone asks for facts) -----
  if (containsAny(msg, ['fact', 'statistic', 'how much waste', 'tonnes'])) {
    return 'The world generates over 2 billion tonnes of municipal solid waste annually, and at least 33% is not managed safely. Recycling and composting can reduce this dramatically.';
  }

  // ----- GENERAL HELP / GREETINGS -----
  if (containsAny(msg, ['hello', 'hi', 'hey', 'good morning', 'good evening'])) {
    return 'Hello! I am EcoSort AI 🌱. Ask me anything about waste segregation, recycling, or how to dispose of specific items. You can also use the Classifier page.';
  }
  if (containsAny(msg, ['help', 'what can you do'])) {
    return 'I can help you identify waste categories (Wet, Dry, E‑Waste, Hazardous), explain disposal and recycling methods, and give tips to reduce waste. Just ask!';
  }
  if (containsAny(msg, ['thank', 'thanks'])) {
    return 'You\'re welcome! Together we can make the planet cleaner 🌍.';
  }

  // ----- FALLBACK FOR UNKNOWN QUESTIONS -----
  return 'I\'m not sure about that. I can help with waste categories, recycling, composting, e‑waste, hazardous waste, and tips to reduce waste. Try rephrasing your question, or use the Classifier page for specific items.';
};

// Helper: check if message contains any of the given words/phrases
function containsAny(str, words) {
  return words.some(w => str.includes(w));
}

module.exports = { classifyWaste, chatWithGemini };