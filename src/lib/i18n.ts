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
  mobileMoneyFee: string;
  mobileMoneyFeeNote: string;
  totalPayable: string;
  platformFee: string;
  cookEarnings: string;
  payMomo: string;
  requestCustomQuote: string;
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
  vendorPlatformFeeInfo: string;
  vendorPlatformFeeDesc: string;
  vendorMenuManagement: string;
  vendorMenuManagementDesc: string;
  vendorBaseDishPrice: string;
  vendorAddonPrices: string;
  vendorSavePrices: string;
  vendorPricesSaved: string;
  // Payment modal
  payWith: string;
  mtnMoney: string;
  orangeMoney: string;
  payNow: string;
  paying: string;
  paymentSuccess: string;
  close: string;
  cancel: string;
  escrowPinTitle: string;
  escrowPinDesc: string;
  confirmEscrow: string;
  pinMismatch: string;
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
  addonBitterleaf: string;
  addonExtraPepper: string;
  addonExtraChicken: string;
  addonBeef: string;
  addonGoat: string;
  addonSmokedFish: string;
  addonEgusi: string;
  baseSelection: string;
  baseNjamaNjama: string;
  baseBitterleaf: string;
  selectSoup: string;
  quantity: string;
  // Misc
  xaf: string;
  loading: string;
  error: string;
  retry: string;
  // Verified badge
  verified: string;
  // Custom group order
  customGroupOrder: string;
  customGroupDesc: string;
  customGuests: string;
  customBudget: string;
  customMenuRequests: string;
  customMenuPlaceholder: string;
  customSubmit: string;
  customSubmitted: string;
  customGuestsPlaceholder: string;
  customBudgetPlaceholder: string;
  // Dispatch notification
  dispatchNotified: string;
  // Welcome bonus & wallet
  welcomeBonus: string;
  welcomeBonusApplied: string;
  walletCredits: string;
  walletCreditsApplied: string;
  walletBalance: string;
  totalAfterDiscounts: string;
  free: string;
  // Custom event request
  customEventRequest: string;
  customEventDesc: string;
  customEventGuests: string;
  customEventGuestsPlaceholder: string;
  customEventBudget: string;
  customEventBudgetPlaceholder: string;
  customEventMenu: string;
  customEventMenuPlaceholder: string;
  taxiCharter: string;
  taxiCharterDesc: string;
  customEventSubmit: string;
  customEventSubmitted: string;
  customEventName: string;
  customEventPhone: string;
  customEventQuarter: string;
  customEventDate: string;
  eventEstimate: string;
  eventPerPerson: string;
  eventPrivacyNote: string;
  eventAutoTaxi: string;
  // Delivery breakdown
  mealTotal: string;
  motorbikeDelivery: string;
  taxiCharterDelivery: string;
  deliveryMethod: string;
  deliveryMoto: string;
  deliveryTaxi: string;
  // Splash
  splashTagline: string;
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
      'Order authentic Bamenda-style Achu & yellow (Ndza Nikki) or black soup, Fufu Corn & Kati-Kati from local cooks in Douala',
    searchPlaceholder: 'Search vendors or dishes in Douala...',
    allQuarters: 'All Quarters',
    featurePoundedTitle: 'Freshly Pounded',
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
    mobileMoneyFee: 'Mobile Money Transaction Fee',
    mobileMoneyFeeNote: 'Handled via operator USSD prompt',
    totalPayable: 'Total Payable by Customer',
    platformFee: 'Platform Fee (15%)',
    cookEarnings: 'Cook Net Earnings (~85%)',
    payMomo: 'Pay via Mobile Money (Escrow)',
    requestCustomQuote: 'Request Custom Quote',
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
    vendorPlatformFeeInfo: 'Platform Fee: 15% per transaction',
    vendorPlatformFeeDesc: 'This fee is deducted from your earnings on each order.',
    vendorMenuManagement: 'Menu & Pricing Management',
    vendorMenuManagementDesc: 'Set your own custom prices for base dishes and individual add-ons.',
    vendorBaseDishPrice: 'Base Dish Price (XAF)',
    vendorAddonPrices: 'Add-on Prices (XAF)',
    vendorSavePrices: 'Save Prices',
    vendorPricesSaved: 'Prices saved! Your menu has been updated.',
    payWith: 'Pay With',
    mtnMoney: 'MTN MoMo Escrow',
    orangeMoney: 'Orange Money Escrow',
    payNow: 'Pay Now',
    paying: 'Processing...',
    paymentSuccess: 'Payment confirmed! Funds held in escrow.',
    close: 'Close',
    cancel: 'Cancel',
    escrowPinTitle: 'Enter Your 4-Digit Escrow PIN',
    escrowPinDesc: 'Create a 4-digit PIN to lock your payment in escrow. The cook receives funds only when this PIN is verified at pickup.',
    confirmEscrow: 'Confirm & Lock in Escrow',
    pinMismatch: 'PINs do not match. Please re-enter.',
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
    addonCanda: 'Canda / Cow Skin',
    addonNjakatu: 'Njakatu / Garden Egg',
    addonNjamaNjama: 'Njama-Njama / Huckleberry',
    addonBitterleaf: 'Bitterleaf Soup',
    addonExtraPepper: 'Extra Pepper',
    addonExtraChicken: 'Extra Kati-Kati Chicken',
    addonBeef: 'Beef / Cow Meat',
    addonGoat: 'Goat Meat',
    addonSmokedFish: 'Smoked Fish',
    addonEgusi: 'Egusi Pudding',
    baseSelection: 'Base Selection',
    baseNjamaNjama: 'Fufu Corn & Kati-Kati with Njama-Njama',
    baseBitterleaf: 'Fufu Corn & Kati-Kati with Bitterleaf Soup',
    selectSoup: 'Please select a soup',
    quantity: 'Quantity',
    xaf: 'XAF',
    loading: 'Loading...',
    error: 'Something went wrong. Please try again.',
    retry: 'Retry',
    verified: 'Verified',
    customGroupOrder: 'Custom Group Order',
    customGroupDesc: 'Need something different? Tell us your guest count, budget, and special menu requests.',
    customGuests: 'Number of Guests',
    customGuestsPlaceholder: 'e.g. 75',
    customBudget: 'Budget (XAF)',
    customBudgetPlaceholder: 'e.g. 90000',
    customMenuRequests: 'Special Menu Requests',
    customMenuPlaceholder: 'e.g. 50% Achu yellow soup, 50% Kati-Kati, extra pepper for all...',
    customSubmit: 'Submit Custom Request',
    customSubmitted: 'Custom request submitted! We will match you with a cook and notify you via SMS/WhatsApp.',
    dispatchNotified: 'Quarter Captain & Vendor Notified via Automated SMS/WhatsApp',
    welcomeBonus: 'Welcome Bonus',
    welcomeBonusApplied: 'Welcome Bonus Applied',
    walletCredits: 'Wallet/Referral Credits',
    walletCreditsApplied: 'Credits Applied',
    walletBalance: 'Wallet Balance',
    totalAfterDiscounts: 'Total After Discounts',
    free: 'Free',
    customEventRequest: 'Custom Event Request',
    customEventDesc: 'Planning a wedding, Njangi, or corporate event? Get a tailored quote with flexible delivery.',
    customEventGuests: 'Number of Guests',
    customEventGuestsPlaceholder: 'e.g. 150',
    customEventBudget: 'Budget (XAF)',
    customEventBudgetPlaceholder: 'e.g. 200000',
    customEventMenu: 'Special Menu Requests',
    customEventMenuPlaceholder: 'e.g. 60% Achu yellow soup, 40% Kati-Kati, vegetarian options...',
    taxiCharter: 'Taxi Charter Delivery Required',
    taxiCharterDesc: 'For large bulk shipments requiring a chartered taxi',
    customEventSubmit: 'Submit Event Request',
    customEventSubmitted: 'Event request submitted! We will match you with a cook and send a tailored quote via SMS/WhatsApp.',
    customEventName: 'Contact Name',
    customEventPhone: 'Phone Number',
    customEventQuarter: 'Delivery Quarter',
    customEventDate: 'Event Date',
    mealTotal: 'Meal Total',
    motorbikeDelivery: 'Quarter Motorbike Delivery',
    taxiCharterDelivery: 'Taxi Charter Delivery',
    deliveryMethod: 'Delivery Method',
    deliveryMoto: 'Motorbike (1,000 XAF)',
    deliveryTaxi: 'Taxi Charter (5,000 XAF)',
    eventEstimate: 'Instant Price Estimate',
    eventPerPerson: '~1,500 XAF per person',
    eventPrivacyNote: 'All quotes are processed through Achu & Kati-Kati Express Escrow. Vendor identities remain protected.',
    eventAutoTaxi: 'Taxi Charter auto-included for 30+ guests',
    splashTagline: 'Grassfield Delicacies, Delivered Hot',
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
      "Commandez l'Achu authentique style Bamenda avec sauce jaune (Ndza Nikki) ou noire, le Fufu Corn et Kati-Kati auprès des cuisiniers locaux de Douala",
    searchPlaceholder: 'Rechercher des vendeurs ou plats à Douala...',
    allQuarters: 'Tous les Quartiers',
    featurePoundedTitle: 'Pilé à la minute',
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
    mobileMoneyFee: 'Frais de Transaction Mobile Money',
    mobileMoneyFeeNote: 'Via prompt USSD opérateur',
    totalPayable: 'Total à Payer par le Client',
    platformFee: 'Frais de Plateforme (15%)',
    cookEarnings: 'Bénéfices Net Cuisinier (~85%)',
    payMomo: 'Payer par Mobile Money (Escrow)',
    requestCustomQuote: 'Demander un devis',
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
    vendorPlatformFeeInfo: 'Frais de Plateforme: 15% par transaction',
    vendorPlatformFeeDesc: 'Ces frais sont déduits de vos gains sur chaque commande.',
    vendorMenuManagement: 'Gestion Menu & Tarifs',
    vendorMenuManagementDesc: 'Définissez vos propres prix pour les plats de base et suppléments.',
    vendorBaseDishPrice: 'Prix de Base du Plat (XAF)',
    vendorAddonPrices: 'Prix des Suppléments (XAF)',
    vendorSavePrices: 'Sauvegarder les Prix',
    vendorPricesSaved: 'Prix sauvegardés! Votre menu a été mis à jour.',
    payWith: 'Payer Avec',
    mtnMoney: 'MTN MoMo Escrow',
    orangeMoney: 'Orange Money Escrow',
    payNow: 'Payer Maintenant',
    paying: 'Traitement...',
    paymentSuccess: 'Paiement confirmé! Fonds bloqués en escrow.',
    close: 'Fermer',
    cancel: 'Annuler',
    escrowPinTitle: 'Entrez Votre Code PIN Escrow à 4 Chiffres',
    escrowPinDesc: 'Créez un code PIN à 4 chiffres pour bloquer votre paiement en escrow. Le cuisinier ne reçoit les fonds qu\'après vérification du PIN au retrait.',
    confirmEscrow: 'Confirmer & Bloquer en Escrow',
    pinMismatch: 'Les codes PIN ne correspondent pas. Veuillez réessayer.',
    catAllCooks: 'Tous les Cuisiniers',
    catAchuSpecialists: 'Spécialistes Achu',
    catFufuKatiKati: 'Fufu & Kati-Kati',
    catFullMenu: 'Menu Complet',
    servesAchu: "Sert de l'Achu",
    servesKatiKati: 'Sert Fufu & Kati-Kati',
    servesFullMenu: 'Menu Complet',
    achuSpecial: 'Achu Spécial',
    fufuKatiKati: 'Fufu de Maïs & Kati-Kati',
    soupSelection: 'Choix de Sauce',
    soupYellow: 'Sauce Jaune',
    soupBlack: 'Sauce Noire',
    soupMix: 'Mixte (Jaune + Noire)',
    addOns: 'Suppléments Optionnels',
    addonTripe: 'Serviette',
    addonCanda: 'Kanda / Peau de vache',
    addonNjakatu: 'Njakatu',
    addonNjamaNjama: 'Njama-Njama / Légumes',
    addonBitterleaf: 'Sauce Feuille Amère',
    addonExtraPepper: 'Piment Supplémentaire',
    addonExtraChicken: 'Poulet Kati-Kati Supp',
    addonBeef: 'Viande de bœuf',
    addonGoat: 'Viande de chèvre',
    addonSmokedFish: 'Poisson fumé',
    addonEgusi: 'Egusi Pudding',
    baseSelection: 'Choix de Base',
    baseNjamaNjama: 'Fufu Corn & Kati-Kati avec Njama-Njama',
    baseBitterleaf: 'Fufu Corn & Kati-Kati avec Sauce Feuille Amère',
    selectSoup: 'Veuillez choisir une sauce',
    quantity: 'Quantité',
    xaf: 'XAF',
    loading: 'Chargement...',
    error: 'Une erreur est survenue. Veuillez réessayer.',
    retry: 'Réessayer',
    verified: 'Vérifié',
    customGroupOrder: 'Commande de Groupe Personnalisée',
    customGroupDesc: 'Besoin de quelque chose de différent? Dites-nous votre nombre d\'invités, budget et demandes spéciales.',
    customGuests: 'Nombre d\'Invités',
    customGuestsPlaceholder: 'ex. 75',
    customBudget: 'Budget (XAF)',
    customBudgetPlaceholder: 'ex. 90000',
    customMenuRequests: 'Demandes de Menu Spéciales',
    customMenuPlaceholder: 'ex. 50% Achu sauce jaune, 50% Kati-Kati, piment supplémentaire pour tous...',
    customSubmit: 'Soumettre la Demande',
    customSubmitted: 'Demande envoyée! Nous vous mettrons en relation avec un cuisinier et vous notifierons par SMS/WhatsApp.',
    dispatchNotified: 'Capitaine de Quartier & Vendeur Notifiés par SMS/WhatsApp Automatique',
    welcomeBonus: 'Bonus de Bienvenue',
    welcomeBonusApplied: 'Bonus de Bienvenue Appliqué',
    walletCredits: 'Crédits Portefeuille/Parrainage',
    walletCreditsApplied: 'Crédits Appliqués',
    walletBalance: 'Solde du Portefeuille',
    totalAfterDiscounts: 'Total Après Remises',
    free: 'Gratuit',
    customEventRequest: 'Demande d\'Événement Personnalisée',
    customEventDesc: 'Mariage, Njangi ou événement d\'entreprise? Obtenez un devis adapté avec livraison flexible.',
    customEventGuests: 'Nombre d\'Invités',
    customEventGuestsPlaceholder: 'ex. 150',
    customEventBudget: 'Budget (XAF)',
    customEventBudgetPlaceholder: 'ex. 200000',
    customEventMenu: 'Demandes de Menu Spéciales',
    customEventMenuPlaceholder: 'ex. 60% Achu sauce jaune, 40% Kati-Kati, options végétariennes...',
    taxiCharter: 'Livraison par Taxi Charter Requise',
    taxiCharterDesc: 'Pour les grandes expéditions en gros nécessitant un taxi affrété',
    customEventSubmit: 'Soumettre la Demande',
    customEventSubmitted: 'Demande envoyée! Nous vous mettrons en relation avec un cuisinier et enverrons un devis via SMS/WhatsApp.',
    customEventName: 'Nom de Contact',
    customEventPhone: 'Numéro de Téléphone',
    customEventQuarter: 'Quartier de Livraison',
    customEventDate: 'Date d\'Événement',
    mealTotal: 'Total Repas',
    motorbikeDelivery: 'Livraison par Moto dans le Quartier',
    taxiCharterDelivery: 'Livraison par Taxi Charter',
    deliveryMethod: 'Méthode de Livraison',
    deliveryMoto: 'Moto (1.000 XAF)',
    deliveryTaxi: 'Taxi Charter (5.000 XAF)',
    eventEstimate: 'Estimation Instantanée du Prix',
    eventPerPerson: '~1.500 XAF par personne',
    eventPrivacyNote: 'Tous les devis sont traités via l\'Escrow Achu & Kati-Kati Express. Les identités des vendeurs restent protégées.',
    eventAutoTaxi: 'Taxi Charter automatique pour 30+ invités',
    splashTagline: 'Délices Grassfield, Livrés Chauds',
  },
};

export const QUARTERS = [
  'Bonaberi',
  'Makepe',
  'Bonamoussadi',
  'Kotto',
  'Logbessou',
  'Logpom',
  'Akwa',
  'Bonanjo',
  'Bonapriso',
  'Ndogbong',
  'Bassa',
  'Deido',
];
