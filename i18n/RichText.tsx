import React from 'react';
import { useTranslation } from './index';

/**
 * Helper to render a translation string that contains a `{{token}}` placeholder
 * styled differently than the surrounding text.
 *
 *   <RichText i18nKey="foo.bar" values={{ modelConfig: t('sidebar.modelConfig') }}
 *            tokens={{ modelConfig: { className: 'text-cyan-300' } }} />
 *
 * The token is rendered with the given className; the rest of the string is
 * rendered as plain text. The token's actual value is found in the interpolated
 * string by matching it (first occurrence).
 */
export const RichText: React.FC<{
  i18nKey: string;
  values?: Record<string, string | number>;
  tokens?: Record<string, { className?: string }>;
  className?: string;
}> = ({ i18nKey, values = {}, tokens = {}, className }) => {
  const { t } = useTranslation();
  let text = t(i18nKey, values);
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    let earliest = -1;
    let earliestName = '';
    for (const name of Object.keys(tokens)) {
      const tokenValue = String(values[name] ?? '');
      if (!tokenValue) continue;
      const idx = remaining.indexOf(tokenValue);
      if (idx >= 0 && (earliest < 0 || idx < earliest)) {
        earliest = idx;
        earliestName = name;
      }
    }
    if (earliest < 0) {
      parts.push(<React.Fragment key={key++}>{remaining}</React.Fragment>);
      break;
    }
    const tokenValue = String(values[earliestName]);
    if (earliest > 0) {
      parts.push(<React.Fragment key={key++}>{remaining.slice(0, earliest)}</React.Fragment>);
    }
    parts.push(
      <span key={key++} className={tokens[earliestName].className}>
        {tokenValue}
      </span>
    );
    remaining = remaining.slice(earliest + tokenValue.length);
  }
  return <span className={className}>{parts}</span>;
};
