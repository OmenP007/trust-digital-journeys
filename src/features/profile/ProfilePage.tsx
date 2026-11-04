import React, { useEffect, useState } from 'react';
import {
  BadgeCheck,
  ShoppingCart,
  Store,
  Banknote,
  Code2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { roleLabel } from '@/lib/roles';
import type { SellerAccountSummary } from '@/types/escrow';

export const ProfilePage: React.FC = () => {
  const { user, setUser, refreshUser } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [sellerAccount, setSellerAccount] = useState<SellerAccountSummary | null | undefined>(
    user?.seller_account
  );

  useEffect(() => {
    setFullName(user?.full_name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    if (user?.seller_account !== undefined) setSellerAccount(user.seller_account);
  }, [user?.id, user?.full_name, user?.email, user?.phone, user?.seller_account]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const updated = await api.updateMe({ full_name: fullName, email, phone });
      setUser(updated);
      await refreshUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setError(err.message || "Impossible d'enregistrer les modifications.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-page-enter max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#F4F6FC]">
          Paramètres du Profil
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Gérez vos informations personnelles et coordonnées de contact.
        </p>
      </div>

      <Card className="p-6 opacity-0 animate-enter stagger-1" style={{ animationFillMode: 'forwards' }}>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7B3DFF] to-[#00E5FF] p-0.5">
              <div className="w-full h-full rounded-full bg-[#0B0F14] flex items-center justify-center text-xl font-bold text-white">
                {user?.username ? user.username.slice(0, 2).toUpperCase() : 'TR'}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-[#F4F6FC]">
                @{user?.username || 'utilisateur'}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {user?.is_kyc_approved ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <BadgeCheck size={14} />
                    KYC Vérifié
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    KYC Non Vérifié
                  </span>
                )}
                <span className="text-[11px] text-slate-400">
                  Rôle : {roleLabel(user?.role)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              label="Adresse Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Input
            label="Numéro de téléphone (Mobile Money)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+225 ..."
          />

          {saved && (
            <p className="text-xs font-semibold text-emerald-500 animate-enter" style={{ animationFillMode: 'forwards' }}>
              Modifications enregistrées avec succès.
            </p>
          )}

          {error && (
            <p className="text-xs font-semibold text-rose-500 animate-enter" style={{ animationFillMode: 'forwards' }}>
              {error}
            </p>
          )}

          <div className="pt-2">
            <Button variant="primary" size="sm" type="submit" isLoading={saving}>
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </Card>

      {/* ── Capacités & Compte Vendeur ───────────────────────────────────── */}
      {user?.capabilities && (
        <Card className="p-6 opacity-0 animate-enter stagger-2" style={{ animationFillMode: 'forwards' }}>
          <h3 className="text-base font-bold text-slate-900 dark:text-[#F4F6FC] mb-4">
            Capacités du compte
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'can_buy',             label: 'Acheteur',   Icon: ShoppingCart },
              { key: 'can_sell',            label: 'Vendeur',    Icon: Store },
              { key: 'can_receive_payouts', label: 'Versements', Icon: Banknote },
              { key: 'can_develop',         label: 'API',        Icon: Code2 },
            ].map(({ key, label, Icon }) => {
              const enabled = user.capabilities![key as keyof typeof user.capabilities];
              return (
                <div
                  key={key}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border text-xs font-semibold transition-colors ${
                    enabled
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {enabled
                    ? <CheckCircle2 size={14} className="shrink-0" />
                    : <XCircle size={14} className="shrink-0" />}
                  <Icon size={13} className="shrink-0" />
                  {label}
                </div>
              );
            })}
          </div>

          {sellerAccount && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Compte vendeur
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {sellerAccount.type === 'individual' ? 'Particulier' : 'Entreprise'}
                </span>
                <span className={`px-2 py-1 rounded-lg font-semibold ${
                  sellerAccount.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : sellerAccount.status === 'suspended'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                  {sellerAccount.status === 'active' ? 'Actif' : sellerAccount.status === 'suspended' ? 'Suspendu' : 'Fermé'}
                </span>
                <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Identité : {sellerAccount.identity_status}
                </span>
                {sellerAccount.type === 'company' && (
                  <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Entreprise : {sellerAccount.business_status}
                  </span>
                )}
                <span className={`px-2 py-1 rounded-lg ${sellerAccount.psp_linked ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                  PSP {sellerAccount.psp_linked ? 'lié' : 'non lié'}
                </span>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
