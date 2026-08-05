import React, { useState } from 'react';
import { ViewMode, Garment, CartItem, Transaction, RewardCoupon, Review } from './types';
import { MOCK_GARMENTS, MOCK_TRANSACTIONS, MOCK_REWARDS, MOCK_REVIEWS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { GarmentDetailModal } from './components/GarmentDetailModal';
import { PublishModal } from './components/PublishModal';
import { Toast } from './components/Toast';

import { CatalogView } from './views/CatalogView';
import { CartView } from './views/CartView';
import { TransactionsView } from './views/TransactionsView';
import { ShipmentDetailView } from './views/ShipmentDetailView';
import { LoyaltyView } from './views/LoyaltyView';
import { ProfileView } from './views/ProfileView';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('catalog');
  const [garments, setGarments] = useState<Garment[]>(MOCK_GARMENTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { garment: MOCK_GARMENTS[0], selectedForPurchase: true }
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [rewards, setRewards] = useState<RewardCoupon[]>(MOCK_REWARDS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [userPoints, setUserPoints] = useState<number>(1250);

  // Modals & Selection States
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [swapTargetGarment, setSwapTargetGarment] = useState<Garment | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'reward' } | null>({
    message: '¡Bienvenida a ReVuelta! Explora prendas o propón un trueque.',
    type: 'info'
  });

  const showToast = (message: string, type: 'success' | 'info' | 'reward' = 'success') => {
    setToast({ message, type });
  };

  // Garment Actions
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setGarments((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const isFav = !g.isFavorite;
          showToast(
            isFav ? `Prenda guardada en tus favoritos.` : `Prenda eliminada de favoritos.`
          );
          return { ...g, isFavorite: isFav };
        }
        return g;
      })
    );
  };

  const handleAddToCart = (garment: Garment, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const exists = cartItems.some((ci) => ci.garment.id === garment.id);
    if (exists) {
      showToast(`Esta prenda ya está en tu carrito.`, 'info');
    } else {
      setCartItems((prev) => [...prev, { garment, selectedForPurchase: true }]);
      showToast(`¡Prenda "${garment.title}" agregada al carrito!`);
    }
  };

  const handleProposeSwap = (garment: Garment, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSwapTargetGarment(garment);
    setCurrentView('cart');
    showToast(`Iniciando propuesta de trueque para "${garment.title}".`, 'info');
  };

  const handlePublishGarment = (newGarment: Garment) => {
    setGarments((prev) => [newGarment, ...prev]);
    setUserPoints((pts) => pts + 50);
    showToast(`¡Prenda "${newGarment.title}" publicada con éxito! Ganaste +50 pts ReVuelta.`, 'reward');
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.garment.id !== id));
    showToast(`Prenda removida del carrito.`, 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Checkout / Swap Completion
  const handleCheckoutSuccess = (title: string, amount: number, isSwap: boolean) => {
    const newTx: Transaction = {
      id: `t_${Date.now()}`,
      orderNumber: `RV-${Math.floor(1000 + Math.random() * 9000)}`,
      type: isSwap ? 'Trueque' : 'Compra',
      status: 'En camino',
      title: title,
      detail: isSwap ? 'Propuesta de trueque enviada - En preparación' : 'Pago confirmado - En tránsito al punto de acopio',
      date: 'Hoy',
      amountCOP: amount,
      image: swapTargetGarment?.image || cartItems[0]?.garment.image || MOCK_GARMENTS[0].image,
      shipmentNumber: `#${Math.floor(4000 + Math.random() * 900)}`,
      trackingCode: `ECO${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'EcoLogistics express',
      co2SavedKg: 12.4,
      pickupPoint: {
        name: 'Punto de Acopio - ReVuelta Chapinero Hub',
        address: 'Calle 63 #13-45, Local 102',
        city: 'Bogotá D.C.',
        hours: 'Lun a Sáb: 9:00 AM - 7:00 PM'
      },
      timeline: [
        { step: 'Pedido y transacción registrada', date: 'Hoy, Hace instantes', completed: true },
        { step: 'En preparación & control higiénico', date: 'Hoy, 02:00 PM', completed: true, current: true },
        { step: 'En camino al punto de acopio Chapinero', date: 'Mañana, 10:00 AM', completed: false },
        { step: 'Listo para reclamar', date: 'Estimado 24 horas', completed: false }
      ]
    };

    setTransactions((prev) => [newTx, ...prev]);
    setSelectedTransaction(newTx);
    setUserPoints((pts) => pts + (isSwap ? 100 : 50));
    setCurrentView('shipment_detail');
    showToast(
      isSwap 
        ? '¡Propuesta de trueque enviada! Ganaste +100 Pts ReVuelta.' 
        : '¡Pedido confirmado! Tu envío ya está en camino.',
      'reward'
    );
  };

  // Pickup Update
  const handleUpdatePickupPoint = (
    transactionId: string,
    point: { name: string; address: string; city: string; hours: string }
  ) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === transactionId) {
          return { ...t, pickupPoint: point };
        }
        return t;
      })
    );
    if (selectedTransaction && selectedTransaction.id === transactionId) {
      setSelectedTransaction({ ...selectedTransaction, pickupPoint: point });
    }
    showToast(`Punto de recogida actualizado a ${point.name}.`);
  };

  // Reward Redemption
  const handleRedeemReward = (reward: RewardCoupon) => {
    if (userPoints < reward.pointsCost) return;
    setUserPoints((pts) => pts - reward.pointsCost);
    showToast(`¡Canjeaste "${reward.title}"! Se ha aplicado a tu cuenta ReVuelta.`, 'reward');
  };

  // Review Addition
  const handleAddReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
    setUserPoints((pts) => pts + 25);
    showToast(`¡Gracias por tu reseña! Ganaste +25 pts ReVuelta.`, 'reward');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9f0] text-[#1c1c16] font-sans antialiased">
      
      {/* App Toast */}
      <Toast
        message={toast?.message || null}
        type={toast?.type}
        onClose={() => setToast(null)}
      />

      {/* App Top Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        cartCount={cartItems.length}
        userPoints={userPoints}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {currentView === 'catalog' && (
          <CatalogView
            garments={garments}
            searchQuery={searchQuery}
            onSelectGarment={setSelectedGarment}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onProposeSwap={handleProposeSwap}
            onOpenPublishModal={() => setIsPublishModalOpen(true)}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'cart' && (
          <CartView
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onNavigate={setCurrentView}
            onCheckoutSuccess={handleCheckoutSuccess}
            swapTargetGarment={swapTargetGarment}
          />
        )}

        {currentView === 'transactions' && (
          <TransactionsView
            transactions={transactions}
            onSelectTransaction={(t) => {
              setSelectedTransaction(t);
              setCurrentView('shipment_detail');
            }}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'shipment_detail' && (
          <ShipmentDetailView
            transaction={selectedTransaction}
            onNavigate={setCurrentView}
            onOpenReviewModal={() => setCurrentView('profile')}
            onUpdatePickupPoint={handleUpdatePickupPoint}
          />
        )}

        {currentView === 'loyalty' && (
          <LoyaltyView
            userPoints={userPoints}
            rewards={rewards}
            onRedeemReward={handleRedeemReward}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            garments={garments}
            reviews={reviews}
            onSelectGarment={setSelectedGarment}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onProposeSwap={handleProposeSwap}
            onAddReview={handleAddReview}
            onNavigate={setCurrentView}
          />
        )}

      </main>

      {/* Garment Detail Modal */}
      <GarmentDetailModal
        garment={selectedGarment}
        onClose={() => setSelectedGarment(null)}
        onAddToCart={handleAddToCart}
        onProposeSwap={handleProposeSwap}
        onViewSellerProfile={() => {
          setSelectedGarment(null);
          setCurrentView('profile');
        }}
      />

      {/* Publish Garment Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublishGarment}
      />

      {/* Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Mobile Bottom Bar Navigation */}
      <MobileNav
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={cartItems.length}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
      />

    </div>
  );
}

export default App;
