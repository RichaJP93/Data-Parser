const validSubscriptionTags = ['active_subscriber', 'expired_subscriber', 'never_subscribed']
const validFreeProductTags = ['has_downloaded_free_product', 'not_downloaded_free_product', 'downloaded_free_product_unknown']
const validIAPProductTags = ['has_downloaded_iap_product', 'not_downloaded_iap_product', 'downloaded_iap_product_unknown']

export const checkTags = (statuses, tag) => {

    const tagParts = tag.split('_');

    if (validSubscriptionTags.includes(tag)) {
        statuses[0] = tag;
    } else if (tagParts.includes('downloaded') && tagParts.includes('free')) {
        statuses[1] = validFreeProductTags[0]; // has_downloaded_free_product
    } else if (tagParts.includes('purchased')) {
        statuses[2] = validIAPProductTags[0]; // has_downloaded_iap_product
    } 

    return statuses;
}
