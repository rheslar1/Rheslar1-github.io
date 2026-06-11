#ifndef NEURAL_SEIZURE_DISTILLED_STUDENT_H
#define NEURAL_SEIZURE_DISTILLED_STUDENT_H

#include <stddef.h>

#define NEURAL_SEIZURE_FEATURE_COUNT 8

float neural_seizure_predict_preictal_probability(const float features[NEURAL_SEIZURE_FEATURE_COUNT]);
int neural_seizure_predict_preictal(const float features[NEURAL_SEIZURE_FEATURE_COUNT]);

#endif
