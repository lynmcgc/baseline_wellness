import React from 'react';
import { Shield } from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onOpenGetStarted: () => void;
  onExploreDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGetStarted, onExploreDemo }) => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-stone-200 bg-stone-100/80 pt-16 pb-12 text-stone-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-stone-900 flex items-center justify-center text-white font-bold text-xs">
                B
              </div>
              <span className="font-bold text-sm text-stone-900 font-display">BASELINE WELLNESS</span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed font-normal">
              {t('footer.brand_desc', 'Unified wearable intelligence translating raw biometrics into plain-language daily guidance and science-led community accountability.')}
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <LanguageSelector variant="footer" />
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">{t('footer.platform', 'Platform')}</h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={onOpenGetStarted} className="text-teal-800 font-semibold hover:text-teal-900 transition-colors cursor-pointer">{t('footer.get_started_trial', 'Get Started (Free Trial)')}</button></li>
              <li><button onClick={onExploreDemo} className="hover:text-stone-900 transition-colors cursor-pointer">{t('nav.member_hub', 'Member Dashboard')}</button></li>
              <li><a href="#compatibility" className="hover:text-stone-900 transition-colors">{t('footer.wearable_sync', 'Wearable Hardware Sync')}</a></li>
              <li><a href="#science" className="hover:text-stone-900 transition-colors">{t('footer.autonomic_science', 'Autonomic & HRV Science')}</a></li>
              <li><a href="#community" className="hover:text-stone-900 transition-colors">{t('footer.cohort_classes', 'Cohort Challenges & Classes')}</a></li>
            </ul>
          </div>

          {/* Hardware Ecosystems */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">{t('footer.integrations', 'Integrations')}</h4>
            <ul className="space-y-2 text-stone-600">
              <li><span>Garmin Connect API</span></li>
              <li><span>Oura Cloud Sync</span></li>
              <li><span>Apple HealthKit Core</span></li>
              <li><span>WHOOP Developer Stream</span></li>
              <li><span>Fitbit / Pixel Webhook</span></li>
            </ul>
          </div>

          {/* Compliance & Privacy */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">{t('footer.trust_legal', 'Trust & Legal')}</h4>
            <ul className="space-y-2 text-stone-600">
              <li><span className="text-stone-700">{t('footer.privacy_policy', 'Privacy Policy (GDPR / CCPA)')}</span></li>
              <li><span className="text-stone-700">{t('footer.terms_of_service', 'Terms of Service')}</span></li>
              <li><span className="text-stone-700">{t('footer.biometric_notice', 'Biometric Data Protection Notice')}</span></li>
              <li><span className="text-stone-700">{t('footer.scientific_disclosure', 'Scientific Advisory Disclosure')}</span></li>
            </ul>
          </div>

        </div>

        {/* Mandatory Bottom Disclaimers */}
        <div className="pt-8 border-t border-stone-200 space-y-4">
          <p className="text-[11px] text-stone-500 leading-relaxed text-justify sm:text-left font-normal">
            <strong>{t('footer.medical_disclaimer_title', 'Medical Disclaimer')}:</strong> {t('footer.medical_disclaimer_desc', 'Baseline Wellness is a health and lifestyle technology service designed for educational, informational, and personal habit optimization purposes only. Statements and biometric indicators (including Recovery Score, HRV analysis, Sleep Readiness, and Autonomic Stress curves) have not been evaluated by the FDA or international regulatory bodies. This product is not intended to diagnose, treat, cure, or prevent any medical condition or disease.')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <p>© {new Date().getFullYear()} Baseline Wellness Inc. {t('footer.all_rights_reserved', 'All rights reserved.')}</p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-teal-800 font-medium">
                <Shield className="w-3 h-3" /> {t('footer.encrypted_biometrics', 'End-to-End Encrypted Biometrics')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
