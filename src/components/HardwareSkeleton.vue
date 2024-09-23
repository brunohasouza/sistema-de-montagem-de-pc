<template>
    <v-card class="skeleton">
        <v-skeleton-loader type="image" class="image" />
        <div class="content">
            <v-skeleton-loader type="sentences" />
            <div class="actions">
                <v-skeleton-loader type="text" class="price" />
                <v-skeleton-loader type="button" class="button" />
            </div>
        </div>
    </v-card>
</template>

<style lang="scss">
    .skeleton {
        display: flex;

        .image {
            display: block;
            flex: 0 0 auto;
            height: 125px;
            width: 125px;
        }

        .content {
            flex: 1;
        }

        .button {
            flex: 0 0 80px;

            .v-skeleton-loader__button {
                margin-top: 0.75rem !important;
                margin-bottom: 0.75rem !important;
            }
        }

        .actions {
            display: flex;
            justify-content: space-between;
        }

        .price {
            flex: 0 0 100px;
        }
    }
</style>
