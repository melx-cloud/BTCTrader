import React, { FC, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { usePrice, usePriceActions } from '../../store/price/usePrice';
import { usePortfolio } from '../../store/portfolio/usePortfolio';
import { COLORS } from '../../constants/theme';
import PriceDisplay from '../PriceDisplay/PriceDisplay';
import PnlText from '../PnlText/PnlText';
import { styles, CHART_HEIGHT, CHART_HEIGHT_SVG, CHART_PAD_TOP } from './PriceChart.styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Y_LABEL_COUNT = 5;

const PriceChart: FC = () => {
  const { current, chart, loading, error } = usePrice();
  const { refresh } = usePriceActions();
  const { btcBalance, avgBuyPrice } = usePortfolio();

  const [labelColWidth, setLabelColWidth] = useState(0);
  const chartLineWidth = SCREEN_WIDTH - 48 - labelColWidth;

  const pnl = btcBalance > 0 ? (current - avgBuyPrice) * btcBalance : null;

  const yLabels = useMemo(() => {
    if (!chart.length) return [];
    const max = Math.max(...chart);
    const min = Math.min(...chart);
    const range = max - min;
    const plotHeight = CHART_HEIGHT - CHART_PAD_TOP;
    return Array.from({ length: Y_LABEL_COUNT }, (_, i) => ({
      value: Math.round(max - (range * i) / (Y_LABEL_COUNT - 1)),
      top: CHART_PAD_TOP + (i / (Y_LABEL_COUNT - 1)) * plotHeight,
    }));
  }, [chart]);

  if (loading && chart.length === 0) {
    return (
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error && chart.length === 0) {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorTitle}>Failed to load price data</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={refresh} activeOpacity={0.8}>
          <Text style={styles.retryBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PriceDisplay price={current} />

      <View style={styles.chartArea}>
        <Text
          style={styles.yLabelProbe}
          onLayout={({ nativeEvent }) =>
            setLabelColWidth(Math.ceil(nativeEvent.layout.width))
          }
        >
          99999
        </Text>

        {chart.length > 0 && chartLineWidth > 0 && (
          <>
            <View style={styles.chartClip}>
              <LineChart
                data={{ labels: [], datasets: [{ data: chart }] }}
                width={chartLineWidth}
                height={CHART_HEIGHT_SVG}
                withDots={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                withInnerLines={false}
                withOuterLines={false}
                style={{ paddingRight: 0 }}
                chartConfig={{
                  backgroundGradientFrom: COLORS.white,
                  backgroundGradientTo: COLORS.white,
                  color: () => COLORS.accent,
                  strokeWidth: 2,
                  fillShadowGradient: COLORS.accent,
                  fillShadowGradientOpacity: 0.3,
                  propsForBackgroundLines: { stroke: 'transparent' },
                }}
                bezier
              />
            </View>

            <View style={[styles.yLabelsContainer, { width: labelColWidth }]}>
              {yLabels.map(({ value, top }, i) => (
                <Text key={i} style={[styles.yLabel, { top }]}>
                  {value}
                </Text>
              ))}
            </View>
          </>
        )}

        {pnl !== null && (
          <View style={styles.pnlOverlay}>
            <PnlText value={pnl} />
          </View>
        )}

        {error && (
          <View style={styles.staleBanner}>
            <Text style={styles.staleText}>Data may be outdated</Text>
            <TouchableOpacity onPress={refresh} activeOpacity={0.7}>
              <Text style={styles.staleRetry}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default PriceChart;
