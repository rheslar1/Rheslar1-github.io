#include "distilled_student.h"

#include <math.h>

static const float kWeights[15] = {0.206484138f, 0.038638435f, 0.085409611f, 0.254196262f, 0.006217089f, -0.007886345f, 0.004274707f, 0.052840555f, 0.003823712f, 0.004274707f, 0.020376587f, 0.066169046f, -0.091509053f, -0.000168592f, 0.011180371f};
static const float kBias = 0.004655042f;
static const float kThreshold = 0.543300000f;

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
