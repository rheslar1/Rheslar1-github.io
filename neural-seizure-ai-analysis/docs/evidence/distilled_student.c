#include "distilled_student.h"

#include <math.h>

static const float kWeights[8] = {0.281216851f, 0.042980542f, 0.018277340f, 0.282204759f, 0.007493233f, -0.037362139f, 0.000974457f, -0.048174289f};
static const float kBias = -0.298851808f;
static const float kThreshold = 0.514200000f;

float neural_seizure_predict_preictal_probability(const float features[NEURAL_SEIZURE_FEATURE_COUNT]) {
    float logit = kBias;
    for (size_t index = 0; index < NEURAL_SEIZURE_FEATURE_COUNT; ++index) {
        logit += kWeights[index] * features[index];
    }
    if (logit > 60.0f) {
        return 1.0f;
    }
    if (logit < -60.0f) {
        return 0.0f;
    }
    return 1.0f / (1.0f + expf(-logit));
}

int neural_seizure_predict_preictal(const float features[NEURAL_SEIZURE_FEATURE_COUNT]) {
    return neural_seizure_predict_preictal_probability(features) >= kThreshold;
}
