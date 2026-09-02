export type Lang = 'en' | 'fr';

export interface Dict {
  // Header
  appName: string;
  tagline: string;
  // Nav
  navHome: string;
  navOrders: string;
  navCatering: string;
  navVendor: string;
  // Hero
  heroPill: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  allQuarters: string;
  // Feature cards
  featurePoundedTitle: string;
  featurePoundedDesc: string;
  featureFastTitle: string;
  featureFastDesc: string;
  featureEscrowTitle: string;
  featureEscrowDesc: string;
  // Vendors
  allCooks: string;
  cooksCount: (n: number) => string;
  perPlate: string;
  reviews: (n: number) => string;
  minPrep: (n: number) => string;
  available: string;
  unavailable: string;
  orderNow: string;
  viewMenu: string;
  noVendors: string;
  // Orders page
  ordersTitle: string;
  ordersDesc: string;
  phoneLabel: string;
  phonePlaceholder: string;
  viewOrdersBtn: string;
  yourPin: string;
  orderStatus: string;
  statusPending: string;
  statusEscrow: string;
  statusReleased: string;
  noOrders: string;
  enterPhone: string;
  dish: string;
  total: string;
  orderDate: string;
  pinReleased: string;
  // Catering
  cateringTitle: string;
  cateringSubtitle: string;
  people: (n: number) => string;
  selectCook: string;
  chooseVendor: string;
  deliveryDate: string;
  yourName: string;
  namePlaceholder: string;
  phone: string;
  quarter: string;
  selectQuarter: string;
  landmark: string;
  landmarkPlaceholder: string;
  orderSummary: string;
  totalFoodPrice: string;
  momoDeposit: string;
  totalPayable: string;
  platformFee: string;
  cookEarnings: string;
  payMomo: string;
  whatsappCook: string;
  cateringBooked: string;
  // Vendor
  vendorTitle: string;
  vendorSubtitle: string;
  enterPin: string;
  enterPinPlaceholder: string;
  verifyPin: string;
  pendingEscrow: string;
  availableCashout: string;
  pinVerified: string;
  pinInvalid: string;
  releasedOrders: string;
  noReleased: string;
  // Payment modal
  payWith: string;
  mtnMoney: string;
  orangeMoney: string;
  payNow: string;
  paying: string;
  paymentSuccess: string;
  close: string;
  cancel: string;
  // Category filters
  catAllCooks: string;
  catAchuSpecialists: string;
  catFufuKatiKati: string;
  catFullMenu: string;
  servesAchu: string;
  servesKatiKati: string;
  servesFullMenu: string;
  // Dish customizations
  achuSpecial: string;
  fufuKatiKati: string;
  soupSelection: string;
  soupYellow: string;
  soupBlack: string;
  soupMix: string;
  addOns: string;
  addonTripe: string;
  addonCanda: string;
  addonNjakatu: string;
  addonNjamaNjama: string;
  addonExtraPepper: string;
  addonExtraChicken: string;
  baseSelection: string;
  baseStandard: string;
  baseExtraFufu: string;
  selectSoup: string;
  quantity: string;
  // Misc
  xaf: string;
  loading: string;
  error: string;
  retry: string;
}

export const dict: Record<Lang, Dict> = {
  en: {
    appName: 'Achu & Kati-Kati Express',
    tagline: 'Grassfield Delicacies, Delivered Hot',
    navHome: 'Home',
    navOrders: 'Orders',
    navCatering: 'Catering',
    navVendor: 'Vendor',
    heroPill: 'Grassfield Delicacies, Delivered Hot',
    heroSubtitle:
      'Order authentic Bamenda-style Achu, yellow & black soup, and Kati-Kati chicken from local cooks in Douala.',
    searchPlaceholder: 'Search vendors or dishes in Douala...',
    allQuarters: 'All Quarters',
    featurePoundedTitle: 'Pounded Fresh',
    featurePoundedDesc: 'Daily, by local Douala cooks',
    featureFastTitle: 'Fast Pickup',
    featureFastDesc: '25–40 min to your quarter',
    featureEscrowTitle: 'Secure Escrow',
    featureEscrowDesc: 'Funds held until 4-Digit PIN is verified',
    allCooks: 'All Douala Cooks',
    cooksCount: (n) => `${n} cooks`,
    perPlate: 'per plate',
    reviews: (n) => `${n} reviews`,
    minPrep: (n) => `${n} min`,
    available: 'Available now',
    unavailable: 'Busy',
    orderNow: 'Order Now',
    viewMenu: 'View Menu',
    noVendors: 'No cooks found in this quarter.',
    ordersTitle: 'Track Your Orders & PIN',
    ordersDesc:
      'Enter the phone number (MTN / Orange Money) you used at checkout to view your 4-Digit Pickup PIN and order status.',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'e.g. 677123456',
    viewOrdersBtn: 'View My Orders',
    yourPin: 'Your 4-Digit Pickup PIN',
    orderStatus: 'Order Status',
    statusPending: 'Payment Pending',
    statusEscrow: 'Held in Escrow',
    statusReleased: 'Funds Released',
    noOrders: 'No orders found for this phone number.',
    enterPhone: 'Please enter a phone number.',
    dish: 'Dish',
    total: 'Total',
    orderDate: 'Order Date',
    pinReleased: 'PIN already used — funds released to cook.',
    cateringTitle: 'Bulk & Event Catering',
    cateringSubtitle:
      'Order Achu by the bucket for weddings, Njangi meetings, and family events across Douala.',
    people: (n) => `${n} people`,
    selectCook: 'Select a Cook',
    chooseVendor: 'Choose a vendor...',
    deliveryDate: 'Delivery Date',
    yourName: 'Your Name',
    namePlaceholder: 'e.g. Njoh Martin',
    phone: 'Phone',
    quarter: 'Douala Quarter',
    selectQuarter: 'Select quarter: Makepe, Akwa, Bonapriso, Kotto, etc.',
    landmark: 'Landmark',
    landmarkPlaceholder: 'e.g. near Collège Lumière',
    orderSummary: 'Order Summary',
    totalFoodPrice: 'Total Food Price',
    momoDeposit: 'MoMo Deposit Processing (~2%)',
    totalPayable: 'Total Payable by Customer',
    platformFee: 'Platform Fee (15%)',
    cookEarnings: 'Cook Net Earnings (~85%)',
    payMomo: 'Pay via MoMo (Escrow)',
    whatsappCook: 'WhatsApp Cook',
    cateringBooked: 'Catering request submitted! Your 4-Digit PIN has been generated.',
    vendorTitle: 'Vendor Escrow Verification',
    vendorSubtitle:
      'Enter the customer 4-Digit Pickup PIN to verify collection and release escrow funds to your wallet.',
    enterPin: 'Enter Customer 4-Digit Pickup PIN',
    enterPinPlaceholder: 'e.g. 4827',
    verifyPin: 'Verify PIN & Release Funds',
    pendingEscrow: 'Pending in Escrow',
    availableCashout: 'Available for Cashout',
    pinVerified: 'PIN verified! Funds released to cook wallet.',
    pinInvalid: 'Invalid PIN. No matching held order found.',
    releasedOrders: 'Released Orders',
    noReleased: 'No funds released yet.',
    payWith: 'Pay With',
    mtnMoney: 'MTN Mobile Money',
    orangeMoney: 'Orange Money',
    payNow: 'Pay Now',
    paying: 'Processing...',
    paymentSuccess: 'Payment confirmed! Funds held in escrow.',
    close: 'Close',
    cancel: 'Cancel',
    catAllCooks: 'All Cooks',
    catAchuSpecialists: 'Achu Specialists',
    catFufuKatiKati: 'Fufu & Kati-Kati',
    catFullMenu: 'Full Menu',
    servesAchu: 'Serves Achu',
    servesKatiKati: 'Serves Fufu & Kati-Kati',
    servesFullMenu: 'Full Menu',
    achuSpecial: 'Achu Special',
    fufuKatiKati: 'Fufu Corn & Kati-Kati',
    soupSelection: 'Soup Selection',
    soupYellow: 'Yellow Soup',
    soupBlack: 'Black Soup',
    soupMix: 'Mix (Yellow + Black)',
    addOns: 'Optional Add-ons',
    addonTripe: 'Towel / Tripe',
    addonCanda: 'Extra Meat / Cow Skin (Canda)',
    addonNjakatu: 'Garden Egg / Njakatu',
    addonNjamaNjama: 'Vegetables / Njama Njama',
    addonExtraPepper: 'Extra Pepper',
    addonExtraChicken: 'Extra Kati-Kati Chicken',
    baseSelection: 'Base Selection',
    baseStandard: 'Standard Portion',
    baseExtraFufu: 'Extra Fufu (+500 XAF)',
    selectSoup: 'Please select a soup',
    quantity: 'Quantity',
    xaf: 'XAF',
    loading: 'Loading...',
    error: 'Something went wrong. Please try again.',
    retry: 'Retry',
  },
  fr: {
    appName: 'Achu & Kati-Kati Express',
    tagline: 'Délices Grassfield, Livrés Chauds',
    navHome: 'Accueil',
    navOrders: 'Commandes',
    navCatering: 'Traiteur',
    navVendor: 'Vendeur',
    heroPill: 'Délices Grassfield, Livrés Chauds',
    heroSubtitle:
      "Commandez de l'Achu style Bamenda, soupe jaune & noire, et poulet Kati-Kati chez des cuisiniers locaux de Douala.",
    searchPlaceholder: 'Rechercher des vendeurs ou plats à Douala...',
    allQuarters: 'Tous les Quartiers',
    featurePoundedTitle: 'Fraîchement Pilé',
    featurePoundedDesc: 'Quotidiennement, par des cuisiniers de Douala',
    featureFastTitle: 'Retrait Rapide',
    featureFastDesc: '25–40 min vers votre quartier',
    featureEscrowTitle: 'Paiement Sécurisé',
    featureEscrowDesc: 'Fonds bloqués jusquà vérification du code PIN',
    allCooks: 'Tous les Cuisiniers de Douala',
    cooksCount: (n) => `${n} cuisiniers`,
    perPlate: 'par assiette',
    reviews: (n) => `${n} avis`,
    minPrep: (n) => `${n} min`,
    available: 'Disponible',
    unavailable: 'Occupé',
    orderNow: 'Commander',
    viewMenu: 'Voir le Menu',
    noVendors: 'Aucun cuisinier trouvé dans ce quartier.',
    ordersTitle: 'Suivez vos Commandes & Code PIN',
    ordersDesc:
      'Entrez le numéro de téléphone (MTN / Orange Money) utilisé au paiement pour voir votre code PIN à 4 chiffres et le statut de commande.',
    phoneLabel: 'Numéro de Téléphone',
    phonePlaceholder: 'ex. 677123456',
    viewOrdersBtn: 'Voir mes Commandes',
    yourPin: 'Votre Code PIN à 4 Chiffres',
    orderStatus: 'Statut de Commande',
    statusPending: 'Paiement en Attente',
    statusEscrow: 'Bloqué en Escrow',
    statusReleased: 'Fonds Libérés',
    noOrders: 'Aucune commande trouvée pour ce numéro.',
    enterPhone: 'Veuillez entrer un numéro de téléphone.',
    dish: 'Plat',
    total: 'Total',
    orderDate: 'Date de Commande',
    pinReleased: 'PIN déjà utilisé — fonds libérés au cuisinier.',
    cateringTitle: 'Service Traiteur & Événements',
    cateringSubtitle:
      "Commandez de l'Achu au seau pour mariages, réunions Njangi et événements familiaux à Douala.",
    people: (n) => `${n} personnes`,
    selectCook: 'Choisir un Cuisinier',
    chooseVendor: 'Choisir un vendeur...',
    deliveryDate: 'Date de Livraison',
    yourName: 'Votre Nom',
    namePlaceholder: 'ex. Njoh Martin',
    phone: 'Téléphone',
    quarter: 'Quartier de Douala',
    selectQuarter: 'Choisir quartier: Makepe, Akwa, Bonapriso, Kotto, etc.',
    landmark: 'Point de Repère',
    landmarkPlaceholder: 'ex. près du Collège Lumière',
    orderSummary: 'Récapitulatif de Commande',
    totalFoodPrice: 'Prix Total de la Nourriture',
    momoDeposit: 'Dépôt MoMo (~2%)',
    totalPayable: 'Total à Payer par le Client',
    platformFee: 'Frais de Plateforme (15%)',
    cookEarnings: 'Bénéfices Net Cuisinier (~85%)',
    payMomo: 'Payer par MoMo (Escrow)',
    whatsappCook: 'WhatsApp Cuisinier',
    cateringBooked: 'Demande de traiteur envoyée! Votre code PIN à 4 chiffres a été généré.',
    vendorTitle: 'Vérification Escrow Vendeur',
    vendorSubtitle:
      'Entrez le code PIN à 4 chiffres du client pour vérifier la collecte et libérer les fonds escrow vers votre portefeuille.',
    enterPin: 'Entrez le Code PIN à 4 Chiffres du Client',
    enterPinPlaceholder: 'ex. 4827',
    verifyPin: 'Vérifier le Code PIN & Libérer les Fonds',
    pendingEscrow: 'En attente en Escrow',
    availableCashout: 'Disponible pour Retrait',
    pinVerified: 'PIN vérifié! Fonds libérés au portefeuille du cuisinier.',
    pinInvalid: 'PIN invalide. Aucune commande bloquée correspondante trouvée.',
    releasedOrders: 'Commandes Libérées',
    noReleased: 'Aucun fonds libéré pour le moment.',
    payWith: 'Payer Avec',
    mtnMoney: 'MTN Mobile Money',
    orangeMoney: 'Orange Money',
    payNow: 'Payer Maintenant',
    paying: 'Traitement...',
    paymentSuccess: 'Paiement confirmé! Fonds bloqués en escrow.',
    close: 'Fermer',
    cancel: 'Annuler',
    catAllCooks: 'Tous les Cuisiniers',
    catAchuSpecialists: 'Spécialistes Achu',
    catFufuKatiKati: 'Fufu & Kati-Kati',
    catFullMenu: 'Menu Complet',
    servesAchu: "Sert de l'Achu",
    servesKatiKati: 'Sert Fufu & Kati-Kati',
    servesFullMenu: 'Menu Complet',
    achuSpecial: 'Achu Spécial',
    fufuKatiKati: 'Fufu de Maïs & Kati-Kati',
    soupSelection: 'Choix de Soupe',
    soupYellow: 'Soupe Jaune',
    soupBlack: 'Soupe Noire',
    soupMix: 'Mixte (Jaune + Noire)',
    addOns: 'Suppléments Optionnels',
    addonTripe: 'Tripe / Towel',
    addonCanda: 'Viande Supp / Peau de Boeuf (Canda)',
    addonNjakatu: 'Aubergine / Njakatu',
    addonNjamaNjama: 'Légumes / Njama Njama',
    addonExtraPepper: 'Piment Supplémentaire',
    addonExtraChicken: 'Poulet Kati-Kati Supp',
    baseSelection: 'Choix de Base',
    baseStandard: 'Portion Standard',
    baseExtraFufu: 'Fufu Supp (+500 XAF)',
    selectSoup: 'Veuillez choisir une soupe',
    quantity: 'Quantité',
    xaf: 'XAF',
    loading: 'Chargement...',
    error: 'Une erreur est survenue. Veuillez réessayer.',
    retry: 'Réessayer',
  },
};

export const QUARTERS = [
  'Makepe',
  'Bonapriso',
  'Akwa',
  'Bonanjo',
  'Kotto',
  'Ndogbong',
  'Ange Raphaël',
];
