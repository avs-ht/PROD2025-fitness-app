import { TargetType } from './workout';

export type TrainStage = 'start' | 'exercise' | 'rest' | 'finish';
export type ActivitySession = { startTime: Date; endTime: Date | null };
export type CompletedExercise = {
  exerciseId: string;
  targetType: TargetType;
  isSkipped: boolean;
  isCompleted: boolean;
};
export interface TrainState {
  workoutId: string;
  trainStage: TrainStage;
  completedExercises: CompletedExercise[];
  sessions: ActivitySession[];
}
